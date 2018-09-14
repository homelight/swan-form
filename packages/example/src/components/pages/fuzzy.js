// adapted from https://github.com/mattyork/fuzzy
import React from 'react';

import styles from './Downshift.scss';

const Span = ({ children }) => <span className={styles.match}>{children}</span>;

// If `pattern` matches `str`, wrap each matching character in `opts.pre` and `opts.post`. If no match, return null
const match = (_pattern, _str, opts = {}) => {
  let patternIdx = 0;

  const result = [];
  const len = _str.length;

  let totalScore = 0;
  let currScore = 0;
  const str = _str.toLowerCase();
  const pattern = _pattern.toLowerCase();

  let ch;

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for (let idx = 0; idx < len; idx++) {
    ch = _str[idx];
    if (str[idx] === pattern[patternIdx]) {
      // ch = '<span>' + ch + '</span>';
      ch = <Span key={idx}>{ch}</Span>;
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if (patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    // totalScore = str === pattern ? Infinity : totalScore;
    if (str === pattern) {
      return {
        rendered: <Span>{_str}</Span>,
        score: Infinity,
      };
    }
    return { rendered: result, score: totalScore };
  }

  return null;
};

// const test = (pattern, str) => match(pattern, str) !== null;

// // Return all elements of `array` that have a fuzzy match against `pattern`.
// const simpleFilter = (pattern, array) => array.filter(str => test(pattern, str));

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
//
//     [{
//         string:   '<b>lah' // The rendered string
//       , index:    2        // The index of the element in `arr`
//       , original: 'blah'   // The original element in `arr`
//     }]
//
// `opts` is an optional argument bag. Details:
//
//    opts = {
//        // string to put before a matching character
//        pre:     '<b>'
//
//        // string to put after matching character
//      , post:    '</b>'
//
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
export const filter = (pattern, arr, opts = {}) => {
  if (!arr || arr.length === 0) {
    return [];
  }
  if (typeof pattern !== 'string') {
    return arr;
  }

  /* eslint-disable no-param-reassign */
  return arr
    .reduce((prev, element, index) => {
      const str = opts.extract ? opts.extract(element) : element;
      const rendered = match(pattern, str, opts);
      if (rendered !== null) {
        prev[prev.length] = {
          string: rendered.rendered,
          score: rendered.score,
          index,
          original: element,
        };
      }
      return prev;
    }, [])
    .sort((a, b) => {
      const compare = b.score - a.score;
      return compare || a.index - b.index;
    });
};

export default filter;
