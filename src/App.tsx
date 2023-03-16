import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Letter from './components/Letter';
import { classNameBuilder } from '@helpers';
import { URL } from '@constants';

const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [letters, setLetters] = useState<string[]>([]);
  const [letterComponents, setLetterComponents] = useState<JSX.Element[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch(URL)
      .then((res) => res.text())
      .then((text) => {
        let chars: string[] = [];
        for (let idx = text.length - 1; idx >= 0; idx--) {
          chars.push(text[idx]);
        }
        setLetters(chars);
      })
      .finally(() => setLoading(false))
      .catch((err) => {
        setError('Oops, something went wrong...');
      });
  }, []);

  useLayoutEffect(() => {
    const typing = setTimeout((): void => {
      if (index >= letters.length) return;

      const letter = letters[index];
      const letterComponent = <Letter key={`${index}${letter}`} letter={letter}/>;
      setLetterComponents((prevValue) => prevValue.concat(letterComponent));
      setIndex(index + 1);
    }, 500);
    return () => clearTimeout(typing);
  }, [index, letterComponents.length, letters.length]);

  return (
    <div className={classNameBuilder()} id="response-wrapper">
      {
        loading ? <p>Loading...</p> : (
          error ? (
            <p className={classNameBuilder('error')}>{error}</p>
          ) : (
            <div className={classNameBuilder()}>
              <p className={classNameBuilder()} id="response-label">Here&apos;s your response:</p>
              <ul className={classNameBuilder()} id="letters-list">{letterComponents}</ul>
            </div>
          )
        )
      }
    </div>
  );
};

export default App;
