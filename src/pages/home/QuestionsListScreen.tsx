import { useRouter } from 'next/router';
import Screen from '../../screens/MenuScreens/QuestionsListScreen';
import { useState } from 'react';
import getUrlSearchParam from '../../hooks/getUrlSearchParam';

const QuestionsListScreen = () => {
  const { asPath } = useRouter();
  const [newlist] = useState(getUrlSearchParam(asPath, 'newList') || undefined);

  return (
    <Screen newlistInitial={newlist} />
  )
};

export default QuestionsListScreen;
