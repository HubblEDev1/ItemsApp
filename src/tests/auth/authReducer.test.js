import { authReducer } from "../../auth/authReducer";
import { userState } from "../fixtures/userState";
import '../../setupTests';
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    test('should return default state', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    });

    test('authenticate and set user name', () => {
        const state = authReducer({logged: false}, {
            type: types.login,
            payload: {
                name: 'Edwin'
            }
        });

        expect(state).toEqual({name: 'Edwin', logged: true});
    })

    test('authenticate and delete user name', () => {
        const state = authReducer(userState, {
            type: types.logout,
        });

        
        expect(state).toEqual({logged: false});
    })
    
    
})
