# Review React 2018

A personal collection of projects, demos, and online course work revisiting React fundamentals and best practices in 2018.

## React for Beginners – 001_react-for-beginners

Wed Feb 28 19:47:33 EST 2018

Wes Bos released the updated version of his [React course](https://reactforbeginners.com/) today. A couple years ago, I followed along with the original version of the course. As the title suggests, it's intended for beginners and fairly basic but completely up-to-date, so I thought it would be a good way to kick off this review. I also want to use it as practice for getting more up to speed with with Jest and Enzyme, so I'll be writing tests and reading docs as I go.

## Styled Components - 002_styled-components

Thu Mar 8 17:01:05 EST 2018

[DCJS](https://www.meetup.com/DC-JavaScript/) is hosting a meetup at NPR tonight, titled "Six Reasons to Use Styled Components", so I figured it would be a good opportunity to take notes and explore CSS in JS.

## Redux Basic - 003_redux

* From older notes, but with tests added.

## TODO: Context API

Source: [Heres how React's New Context API Works
](https://www.youtube.com/watch?v=XLJN4JfniH4&feature=push-u&attr_tag=yoWAlfDXmw2y95nn-6)

```js
// Create a new context

const MyContext = React.createContext();

// Create a provider Component

class MyProvider extends Component {
    state = {
        text: 'test',
        count: 0,
        increase = () => this.setState({
            count: this.state.count + 1
        })
    }
    render(){
        return (
            <MyContext.Provider value={{
                state: this.state
            }}>
            {this.props.children}
            </MyContext.Provider>
        )
    }
}

// Wrap the application in the provider

class App extends Copmonent {
    render(){
        return (
            <MyProvider>
            <div>
            <Child />
            </div>
            </MyProvider>
        )
    }
}


// Create a Consumer Inside the Child

class Child extends Component {
    render(){
        return (
            <div className="child">
            <MyContext.Consumer>
            {(context)=> (
                <React.Fragment>
                <p>{Counter.state.count}</p>
                <p>{Context.state.text}</p>
                <button onClick={context.increase}></button>
                </React.Fragment>
            )}
            </MyContext.Consumer>
            </div>
        )
    }
}
```
