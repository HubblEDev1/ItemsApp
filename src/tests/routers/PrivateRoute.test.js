import { shallow, mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { PrivateRoute } from "../../routers/PrivateRoute"

describe('Testing <PrivateRoute/>', () => {
    const props = {
        location: {
            pathname : '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();


    test('should show the component if is authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={true}
                    component={() => <span>Private Route</span> }
                    {...props}
                />
            </MemoryRouter>
        )    

        console.log(wrapper.html());
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    })

    test('should ', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={false}
                    component={() => <span>Private Route</span> }
                    {...props}
                />
            </MemoryRouter>
        )    

        console.log(wrapper.html());
        expect(wrapper.find('span').exists()).toBe(false);
    })
    
    
})
