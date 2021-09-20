//sentence: 'GOLDEN STATE WARRIORS INTERESTED IN Gasol'
//length: 5
//@returns shorterSentence: ''GOLDEN STATE WARRIORS INTERESTED IN...'

//sentence: 'Bayern wins again Barca'
//length: 5
//NO CHANGE, since sentence converted to an array has a smaller size than 5
//@returns shorterSentence: 'Bayern wins again Barca'

const shortenText = (sentence: string, length: number) => {
  const sentenceArr: string[] = sentence.split(" ");
  const shorterSentence: string =
    sentenceArr.length > length
      ? sentenceArr.slice(0, length).join(" ") + "..."
      : sentenceArr.join(" ");
  return shorterSentence;
};

export default shortenText;
