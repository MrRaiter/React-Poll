import React from 'react';
import styled from 'styled-components';
import { Answer } from '../types';

type Props = {
  option: Answer;
  chosenOption: string | null;
  totalVotes: number;
  picked: boolean;
  maxAnswer: boolean;
  updateChosenOption: (text: string) => void;
};

type styles = {
  maxAnswer: boolean;
};

type barStyle = {
  barFill: number | boolean;
  maxAnswer: boolean;
};

type percentStyle = {
  show: boolean;
};

const Text = styled.div``;

const Percentage = styled.div`
  opacity: ${({ show }: percentStyle) => (show ? 1 : 0)};
  transition: 1s all;
  margin-right: 5px;
`;

const PollOptionWrapper = styled.div`
  position: relative;
  font-weight: ${({ maxAnswer }: styles) => (maxAnswer ? 'bold' : 'initial')};
  display: flex;
  align-items: center;
  border: solid;
  border-color: #cacaca;
  border-width: thin;
  border-radius: 5px;
  min-height: 40px;
  margin-top: 5px;
  transition: all 1s;
`;

const PollFilledBar = styled.div`
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  background-color: ${({ maxAnswer }: barStyle) =>
    maxAnswer ? '#a2fff4' : '#e8e8e8'};
  min-height: inherit;
  padding: ${({ barFill }: barStyle) => (barFill ? '0 5px' : '0')};
  width: ${({ barFill }: barStyle) => (barFill ? `${barFill}%` : '0%')};
  transition: all 1s;
`;

const WrapperForPollText = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TextWithMarkWrapper = styled.div`
  display: inherit;
  align-items: center;
  min-height: inherit;
  padding: 0 10px;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  opacity: ${({ show }: percentStyle) => (show ? 1 : 0)};
  transition: 0.5s all;
`;

export default function PollOption({
  option,
  chosenOption,
  totalVotes,
  picked,
  updateChosenOption,
  maxAnswer,
}: Props) {
  const persent = Math.floor((100 / totalVotes) * option.votes);

  return (
    <PollOptionWrapper
      maxAnswer={!!chosenOption && maxAnswer}
      onClick={() => updateChosenOption(option.text)}
    >
      <WrapperForPollText>
        <TextWithMarkWrapper>
          <Text>{option.text}</Text>
          <Img show={!!chosenOption && picked} src={require('../static/check-circle.svg')} />
        </TextWithMarkWrapper>
        <Percentage show={!!chosenOption}>{`${persent}%`}</Percentage>
      </WrapperForPollText>
      <PollFilledBar
        maxAnswer={maxAnswer}
        barFill={!!chosenOption && persent}
      />
    </PollOptionWrapper>
  );
}
