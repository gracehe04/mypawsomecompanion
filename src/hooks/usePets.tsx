import { useGlobalState } from './GlobalState';

const usePets = () => {
  const { pets, loading, error } = useGlobalState();
  return { pets, loading, error };
};

export default usePets;
