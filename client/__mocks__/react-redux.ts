import { initialMockState } from '../src/testUtil';
const generatedMock = jest.genMockFromModule('react-redux');

export default {
    ...generatedMock,
    useSelector: () => ({ initialMockState }),
}
