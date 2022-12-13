# To check path of stored/ cached transformer models downloaded
# from transformers import file_utils
# print(file_utils.default_cache_path)

from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline
import requests
import random

pos_model = "vblagoje/bert-english-uncased-finetuned-pos"
pos_tokenizer = AutoTokenizer.from_pretrained(pos_model)
pos_model = AutoModelForTokenClassification.from_pretrained(pos_model)
pos_pipeline = pipeline("ner", model=pos_model, tokenizer=pos_tokenizer)



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
    positive_words = set()
    banned_words = ['hyper', 'super', 'style', 'dynamic', 'detailed', 'rendered', 'unreal', 'octane', 'ultra',\
      'high', 'contrast', 'ambient', 'trending', 'wide', 'pose', 'concept', 'unity']

    for o in pos_pipeline(prompt):
        if o['entity'] in ["NOUN", "VERB", "ADJ"]:
          word = prompt[o['start']:].split(' ')[0].lower()
          if (len(word) > 3) and (word[-2:] != 'ed') and (word not in banned_words): 
            positive_words.add((word, str(o['score'])))

    word_file = "/home/ubuntu/qna/english_words.txt"
    WORDS = open(word_file).read().splitlines()
    filtered_words = [word for word in WORDS if len(word) > 3 and len(word) < 9]
    negative_words = set(random.sample(filtered_words, 3))
    new_positive_words = []
    for gt_word in prompt.split(' '):
      for pos_word in positive_words:
        if gt_word == pos_word[0]:
          new_positive_words.append((pos_word[0], pos_word[1]))

    result['pos'] = random.sample(remove_duplicate_tuples(new_positive_words), 4)
    result['neg'] = list(negative_words)

    return result

# print(nlp_tags("pretty cute Neko white dressed dim insanely detailed dynamic hyper super rendered"))



