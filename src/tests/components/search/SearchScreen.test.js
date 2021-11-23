import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Testing <SearchScreen/>', () => {
    test('should show the snapshot with correct values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path = "/search" component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');

    })

    test('should show to batman and input with queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path = "/search" component={SearchScreen} />
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    })

    test('should show the error if doesnt find the hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123123123']}>
                <Route path = "/search" component={SearchScreen} />
            </MemoryRouter>
        )
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There isn\'t a hero with batman123123123');
        expect(wrapper).toMatchSnapshot();
    })

    test('should call the push', () => {
        const history = {
            push: jest.fn()
        }
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123123123']}>
                <Route 
                    path = "/search" 
                    component={() => <SearchScreen history={history}/>} />
            </MemoryRouter>
        )
        
        wrapper.find('input').simulate('change', {
            target: {
                name: 'hero', 
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect(history.push).toHaveBeenCalledWith('?q=batman');
    })
    
    
})
