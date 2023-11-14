import { useRouter } from 'next/router';
import Screen from '../../screens/MenuScreens/QuestionEditorScreen';
import { useState } from 'react';
import getUrlSearchParam from '../../hooks/getUrlSearchParam';

const QuestionEditorScreen = () => {
  const { asPath } = useRouter();
  const [id] = useState(getUrlSearchParam(asPath, 'id') || undefined);

  return (
    <Screen idInitial={id} />
  )
};

export default QuestionEditorScreen;
