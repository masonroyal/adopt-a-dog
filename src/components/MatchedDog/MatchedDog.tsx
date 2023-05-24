import { Dog } from '@/types';
import * as React from 'react';
import Card from '../Card/Card';
import Image from 'next/image';
import DogCard from '../DogCard/DogCard';
import Button from '../Button/Button';

interface MatchedDogProps {
  matchedDog: Dog;
}

function MatchedDog({ matchedDog }: MatchedDogProps) {
  return (
    <>
      <div>You wer matched!</div>
      <DogCard key={matchedDog.id} dog={matchedDog}>
        <Button>Adopt now!</Button>
      </DogCard>
    </>
  );
}

export default MatchedDog;
