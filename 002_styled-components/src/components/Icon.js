import styled from 'styled-components';
import pencil from '../assets/svg/pencil.svg';

const Icon = styled.span`
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  background-image: url(${props => props.name});
  background-size: 100%;
`;

Icon.defaultProps = {
  name: { pencil }
};

export default Icon;
