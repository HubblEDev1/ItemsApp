import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../../auth/AuthContext";
import {LoginScreen} from '../../../components/login/LoginScreen';
import { types } from "../../../types/types";

describe('Testing <LoginScreen/>', () => {
    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Edwin',
            logged: true,
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <LoginScreen history={history} />
            </MemoryRouter>
        </AuthContext.Provider>
    )


    test('should show it correctly', () => {
        console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
    })


    test('should execute dispatch and navigation ', () => {
        wrapper.find('button').prop('onClick')()
        expect(history.replace).toHaveBeenCalled();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload :{
                name: 'Edwin'
            }
        });
    })
    
})
