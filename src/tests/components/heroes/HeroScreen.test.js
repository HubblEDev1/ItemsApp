import { mount, shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroeScreen } from "../../../components/heroes/HeroeScreen";

describe('Testing HeroScreen', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    test('should show redirect component if Url doesnt have args ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}> {/*initial entries defines Url parameters*/} 
                <HeroeScreen history={history}/>
            </MemoryRouter>
        );
     
        expect(wrapper.find('Redirect').exists()).toBe(true);
    })


    test('should show a hero if exist a parameter and it is found ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> {/*initial entries defines Url parameters*/} 
                <Route path="/hero/:heroeId" component={HeroeScreen}/>
            </MemoryRouter>
        );
     
        expect(wrapper.find('.row').exists()).toBe(true);
    })

    test('should return previous screen ', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> {/*initial entries defines Url parameters*/} 
                <Route 
                    path="/hero/:heroeId" 
                    component={(prop) => <HeroeScreen history={history}/>} />
            </MemoryRouter>
        );
        //console.log(wrapper.html())
        wrapper.find('button').prop('onClick')()
        expect(history.push).toHaveBeenCalled();
        expect(history.goBack).not.toHaveBeenCalled();
    
    })

    test('should return previous screen with goBack ', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> {/*initial entries defines Url parameters*/} 
                <Route 
                    path="/hero/:heroeId" 
                    component={(prop) => <HeroeScreen history={history}/>} />
            </MemoryRouter>
        );
        //console.log(wrapper.html())
        wrapper.find('button').prop('onClick')()
        expect(history.push).not.toHaveBeenCalledWith('/');
        expect(history.goBack).toHaveBeenCalled();
    
    })

    test('should call Redirect', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123123123']}> {/*initial entries defines Url parameters*/} 
                <Route 
                    path="/hero/:heroeId" 
                    component={(prop) => <HeroeScreen history={history}/>} />
            </MemoryRouter>
        );

        expect(wrapper.text().trim()).toBe('');
    })
    
})
