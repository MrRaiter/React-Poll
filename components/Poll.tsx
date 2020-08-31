import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA } from '../types';
import PollOption from './PollOption';

type Props = {
  qandas: QandAsDocument;
};

const PollWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PollCard = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 10px #cacaca;
  width: 300px;
  padding: 15px 25px;
`;

const PollHeader = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const PollFooter = styled.div`
  color: gray;
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

export default function Poll({ qandas }: Props) {
  const [question, setQuestion] = useState<QandA | null>(null);
  const [chosenOption, setChosenOption] = useState<string | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * qandas.questions.length);
    const randomQuestion = qandas.questions[randomIndex];
    setQuestion(randomQuestion);
  }, []);

  const totalVotes =
    question?.answers?.reduce(
      (accumulator, curValue) => (accumulator += curValue.votes),
      0
    ) || 0;

  const updateChosenOption = (answer: string) => {
    const updatedVotes: QandA = { ...question! };
    if (!chosenOption) {
      const index = question!.answers.findIndex(
        (answerOnQ) => answerOnQ.text === answer
      );
      updatedVotes.answers[index].votes++;
    } else {
      const newAnswerIndex = question!.answers.findIndex(
        ({ text }) => text === answer
      );
      const oldAnswerIndex = question!.answers.findIndex(
        ({ text }) => text === chosenOption
      );

      updatedVotes.answers[newAnswerIndex].votes++;
      updatedVotes.answers[oldAnswerIndex].votes--;
    }

    setChosenOption(answer);
    setQuestion(updatedVotes);
  };

  const maxVoteAnswer = question?.answers.reduce(
    (accumulator, currentAnswer) => {
      return Math.max(accumulator, currentAnswer.votes);
    },
    0
  );

  return (
    <PollWrapper>
      <PollCard>
        <PollHeader>{question?.question.text}</PollHeader>
        {question?.answers.map((answer) => (
          <PollOption
            chosenOption={chosenOption}
            updateChosenOption={updateChosenOption}
            key={answer.text}
            option={answer}
            totalVotes={totalVotes}
            maxAnswer={maxVoteAnswer === answer.votes}
            picked={answer.text === chosenOption}
          />
        ))}
        <PollFooter>{`${totalVotes} votes`}</PollFooter>
      </PollCard>
    </PollWrapper>
  );
}
