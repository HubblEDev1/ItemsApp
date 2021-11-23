import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { AuthContext } from "../../auth/AuthContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"

describe('Testing <DashboardRoutes/>', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Edwin',
            logged: true
        }
    }
   
    test('should show correctly', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Edwin')
    })
    
    
})
