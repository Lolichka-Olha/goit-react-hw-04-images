import { ThreeCircles } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeCircles
        color="#3f51b5"
        width={60}
        height={60}
        ariaLabel="three-circles-rotating"
      />
    </LoaderContainer>
  );
};
