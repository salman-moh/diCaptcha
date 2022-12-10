# To check path of stored/ cached transformer models downloaded
# from transformers import file_utils
# print(file_utils.default_cache_path)

from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))


pos_model = "vblagoje/bert-english-uncased-finetuned-pos"
pos_tokenizer = AutoTokenizer.from_pretrained(pos_model)
pos_model = AutoModelForTokenClassification.from_pretrained(pos_model)
pos_pipeline = pipeline("ner", model=pos_model, tokenizer=pos_tokenizer)
# 'bert-base-multilingual-cased'
fill_mask_pipeline = pipeline('fill-mask', model="bert-base-uncased")


pos_special_tags =  ["NOUN", "VERB", "ADJ"]
pos_sort_order = {pos: i for i, pos in enumerate(pos_special_tags)}

def pos_sort(rec):
  entity = rec['entity']
  if (entity in pos_sort_order):
    return pos_sort_order[entity]
  return len(pos_special_tags)

def score_sort(rec):
  return rec['score']

def only_valid_pos(rec):
  return rec['word'].isalpha()


def extract_fine_pos(prompt):
  extracted_pos = pos_pipeline(prompt)
  sorted_extracted_pos = sorted(extracted_pos, key=score_sort, reverse=True)
  sorted_extracted_pos.sort(key=pos_sort)
  sorted_extracted_pos = list(filter(only_valid_pos, sorted_extracted_pos))
  return sorted_extracted_pos

def only_valid_mask(record):
    return record['token_str'].isalpha()

def only_non_stop_words(record):
    return record['token_str'] not in stop_words

def only_atleast_4char(record):
    return len(record['token_str']) >= 4

def extract_fine_mask(prompt, pos_record):
    start, end = pos_record['start'], pos_record['end']
  

    gold_word = pos_record['word']
    gold_pos = pos_record['entity']

    # positive keywords
    # print(f"gold={gold_word} pos={gold_pos}")
    # positive_words = fill_mask_pipeline(f"{gold_word} and [MASK] and {gold_word}")
    masked_prompt = prompt[:start] + f"{gold_word} and [MASK] and {gold_word}" + prompt[end:]
    positive_words = fill_mask_pipeline(masked_prompt)
    positive_words = filter(lambda x: gold_word not in x['token_str'], positive_words)
    positive_words = filter(only_valid_mask, positive_words)
    positive_words = filter(only_non_stop_words, positive_words)
    if (gold_pos != 'NOUN'):
        positive_words = filter(only_atleast_4char, positive_words)
    positive_words = sorted(positive_words, key=score_sort, reverse=True)

    positive_tags_result = [(w['token_str'], w['score']) for w in positive_words]

    # negative keywords
    negative_words = fill_mask_pipeline(f"{gold_word} vs [MASK] vs {gold_word}")
    negative_words = filter(lambda x: gold_word not in x['token_str'], negative_words)
    negative_words = filter(only_valid_mask, negative_words)
    negative_words = filter(only_non_stop_words, negative_words)
    if (gold_pos != 'NOUN'):
        negative_words = filter(only_atleast_4char, negative_words)
    negative_words = sorted(negative_words, key=score_sort, reverse=True)
    negative_tags_result = [(w['token_str'], w['score']) for w in negative_words]

    return positive_tags_result, negative_tags_result, gold_word

def sort_tuple(tup):
    tup.sort(key = lambda x: x[1], reverse=True)
    return tup

def remove_duplicate_tuples(list):
    token_list = []
    new_list = []
    for tuple in list:
        token, score = tuple
        if token not in token_list:
            token_list.append(token)
            new_list.append((token, score))

    return new_list

def nlp_tags(prompt):
    result = {'pos': [], 'neg':[], 'gold':[]}

    for gold in extract_fine_pos(prompt):
        pos_list, neg_list, gold_word = extract_fine_mask(prompt, gold)
        result['pos'].extend(pos_list)
        result['neg'].extend(neg_list)
        result['gold'].append(gold_word)

    result['pos'] = remove_duplicate_tuples(sort_tuple(result['pos']))
    result['neg'] = remove_duplicate_tuples(sort_tuple(result['neg']))
    return result


# print(nlp_tags("2 realistic character concept, beautiful cosmic girl, curly long hair, ginger, medium shot, elegant pose, cosmonaut, scifi, illustration, slender symmetrical face and body, artstation, cinematic lighting, hyperdetailed, cgsociety, 8k, high resolution, Charlie Bowater, Tom Bagshaw, single face, insanely detailed and intricate, beautiful, elegant, golden ratio, dark fractal background, vfx, postp"))
