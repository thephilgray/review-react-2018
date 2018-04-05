# Review React 2018

A personal collection of projects, demos, and online course work revisiting React fundamentals and best practices in 2018.

## React for Beginners – 001_react-for-beginners

Wed Feb 28 19:47:33 EST 2018

Wes Bos released the updated version of his [React course](https://reactforbeginners.com/). A couple years ago, I followed along with the original version of the course. As the title suggests, it's intended for beginners and fairly basic but completely up-to-date, so I thought it would be a good way to kick off this review. I also wanted to use it as practice for getting more up to speed with with Jest and Enzyme.

Complete with tests.

## Styled Components - 002_styled-components

* Recreate the components in this [VUE project](https://github.com/philgrayphilgray/designs-2018/tree/master/000_album-collector) using React, Styled Components, and a TDD approach.

## Redux Basic - 003_redux

## TODO: Redux, Axios, JSON Server - 004_redux-axios

### Hookup redux to a fake rest API server with JSON Server and axios.

* Install json-server globally

```bash
yarn add global json-server
```

* Create fake data in a file named db.json

```js
//db.json - Sun Ra discography from Wikipedia, abbreviated for brevity
{
  "albums": [
    {
      "Released": 1956,
      "Album": "Jazz by Sun Ra (aka Sun Song)",
      "Artist": "Sun Ra and his Arkestra",
      "Label": "Transition",
      "id": 0
    },
    {
      "Released": 1956,
      "Album": "Super-Sonic Jazz",
      "Artist": "Le Sun Ra and his Arkestra",
      "Label": "El Saturn",
      "id": 1
    },
    {
      "Released": 1956,
      "Album": "Sound of Joy",
      "Artist": "Sun Ra and the Arkestra",
      "Label": "Delmark Records",
      "id": 2
    },
  ]
}
```

* Run the server on a different port (the react app should still be running on port 3000)

```bash
json-server --watch db.json --port 4000
```

* Install redux-thunk for asynchronous actions

```bash
yarn add redux-thunk
```

* Import `applyMiddleware` from `redux` into `store.js`
* Import `thunk` into `store.js`
* Pass `thunk` as an argument to `applyMiddleware()`, pass `applyMiddleware()` as an argument to `composeEnhancers()`

```js
// store.js
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
```

* Create an axios instance as a separate file

```js
// axios.js
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:4000/'
});
export default instance;
```

* Create a new action type in actionTypes.js

```js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
```

* Import `axios` instance into `actions.js`
* Import the new action type into `actions.js`
* Create a `fetchAlbumsSuccess` action creator that takes an object and returns it with the `FETCH_ALBUMS_SUCCESS` type
* Create an async action to hydrate the store with albums fetched from the JSON server

```js
// actions.js
import { INCREMENT, DECREMENT, FETCH_ALBUMS_SUCCESS } from './actionTypes';
import axios from '../../axios';
export const increment = () => {
  return {
    type: INCREMENT
  };
};
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
export const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};
export const fetchAlbums = () => {
  return dispatch => {
    axios.get('albums').then(response => {
      const fetchedAlbums = [];
      response.data.forEach(album => {
        fetchedAlbums.push(album);
      });
      dispatch(fetchAlbumsSuccess(fetchedAlbums));
    });
  };
};
```

* Add an empty array to the store’s initial state
* Import `FETCH_ALBUMS_SUCCESS` action type into `reducer.js` and create a new case for it

```js
// reducer.js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS
} from '../actions/actionTypes';
const initialState = {
  counter: 0,
  albums: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    default:
      return state;
  }
};
export default reducer;
```

* Create a component to call the asynchronous action
* Call mapped dispatch function to dispatch `fetchAlbums` from `componentDidMount()`
* Map and display the fetched data
* Import new component into one of the routed containers

```js
import { fetchAlbums } from '../../store/actions/actions';
class Albums extends Component {
  componentDidMount() {
    this.props.onFetchAlbums();
  }
  render() {
    let albumsTable = '';
    if (this.props.albums) {
      const albumsList = this.props.albums
        .sort((a, b) => {
          return (
            a.released.toString().substring(0, 4) -
            b.released.toString().substring(0, 4)
          );
        })
        .map(album => {
          return (
            <tr key={album.id}>
              <td>{album.album}</td>
              <td>{album.artist}</td>
              <td>{album.label}</td>
              <td>{album.released}</td>
            </tr>
          );
        });
      albumsTable = (
        <table>
          <tbody>{albumsList}</tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Albums</h2>
        {albumsTable}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
const mapDispatchToActions = dispatch => {
  return {
    onFetchAlbums: () => dispatch(fetchAlbums())
  };
};
export default connect(mapStateToProps, mapDispatchToActions)(Albums);
```

#### Create CRUD (Create, Read, Update, Delete) actions with JSON Server

* Create a new action type in actionTypes.js

```js
// actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const ADD_NEW_ALBUM = 'ADD_NEW_ALBUM';
```

* Import the new action type into `actions.js`
* Create a `addNewAlbumSuccess` action creator that takes an object and returns it with the `ADD_NEW_ALBUM` type
* Call the fetch action to rehydrate the redux store after adding a new album

```js
// actions.js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM
} from './actionTypes';
import axios from '../../axios';
export const increment = () => {
  return {
    type: INCREMENT
  };
};
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};
export const fetchAlbums = () => {
  return dispatch => {
    axios.get('albums').then(response => {
      console.log(response);
      const fetchedAlbums = [];
      response.data.forEach(album => {
        fetchedAlbums.push(album);
      });
      dispatch(fetchAlbumsSuccess(fetchedAlbums));
    });
  };
};
const addNewAlbumSuccess = () => {
  return {
    type: ADD_NEW_ALBUM
  };
};
export const addNewAlbum = newAlbumDetails => {
  return dispatch => {
    axios
      .post('albums/', newAlbumDetails)
      .then(response => {
        console.log(response);
        dispatch(addNewAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
```

* Import `ADD_NEW_ALBUM` action type into `reducer.js` and create a new case for it

```js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM
} from '../actions/actionTypes';
const initialState = {
  counter: 0,
  albums: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    case ADD_NEW_ALBUM:
      return state;
    default:
      return state;
  }
};
export default reducer;
```

* Create a form component for posting an album and include it in one of the routed components
* Call mapped dispatch function to dispatch `addNewAlbum` from `addNewAlbumSubmitHandler()`
* Import and use new component into one of the routed containers (in this case `Albums.js`)

```js
// src/components/NewAlbumForm/NewAlbumForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewAlbum } from '../../store/actions/actions';
class NewAlbumForm extends Component {
  state = {
    album: '',
    artist: '',
    label: '',
    released: ''
  };
  addNewAlbumSubmitHandler = event => {
    event.preventDefault();
    // dispatch action
    const albumInput = this.state;
    this.props.onAddNewAlbum(albumInput);
    this.setState({
      album: '',
      artist: '',
      label: '',
      released: ''
    });
  };
  albumChangeHandler = event => {
    this.setState({
      album: event.target.value
    });
  };
  artistChangeHandler = event => {
    this.setState({
      artist: event.target.value
    });
  };
  labelChangeHandler = event => {
    this.setState({
      label: event.target.value
    });
  };
  releasedChangeHandler = event => {
    this.setState({
      released: event.target.value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.addNewAlbumSubmitHandler}>
          <label>Album</label>
          <input
            type="text"
            placeholder="album"
            value={this.state.album}
            onChange={this.albumChangeHandler}
          />
          <label>Artist</label>
          <input
            type="text"
            placeholder="artist"
            value={this.state.artist}
            onChange={this.artistChangeHandler}
          />
          <label>Label</label>
          <input
            type="text"
            placeholder="label"
            value={this.state.label}
            onChange={this.labelChangeHandler}
          />
          <label>Released</label>
          <input
            type="text"
            placeholder="released"
            value={this.state.released}
            onChange={this.releasedChangeHandler}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToActions = dispatch => {
  return {
    onAddNewAlbum: newAlbumDetails => dispatch(addNewAlbum(newAlbumDetails))
  };
};
export default connect(null, mapDispatchToActions)(NewAlbumForm);
```

#### Add Delete buttons

* Create a new action type in `actionTypes.js`

```js
// actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const ADD_NEW_ALBUM = 'ADD_NEW_ALBUM';
export const DELETE_ALBUM = 'DELETE_ALBUM';
```

* Import the new action type into `actions.js`
* Create a `deleteAlbumSuccess` action creator that takes an object and returns it with the `DELETE_ALBUM` type
* Create an async function that accepts an `id` argument and deletes the corresponding record

```js
// actions.js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM,
  DELETE_ALBUM
} from './actionTypes';
import axios from '../../axios';
export const increment = () => {
  return {
    type: INCREMENT
  };
};
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};
export const fetchAlbums = () => {
  return dispatch => {
    axios.get('albums').then(response => {
      console.log(response);
      const fetchedAlbums = [];
      response.data.forEach(album => {
        fetchedAlbums.push(album);
      });
      dispatch(fetchAlbumsSuccess(fetchedAlbums));
    });
  };
};
const addNewAlbumSuccess = () => {
  return {
    type: ADD_NEW_ALBUM
  };
};
export const addNewAlbum = newAlbumDetails => {
  return dispatch => {
    axios
      .post('albums/', newAlbumDetails)
      .then(response => {
        console.log(response);
        dispatch(addNewAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
const deleteAlbumSuccess = () => {
  return {
    type: DELETE_ALBUM
  };
};
export const deleteAlbum = id => {
  return dispatch => {
    axios
      .delete('albums/' + id)
      .then(response => {
        console.log(response);
        dispatch(deleteAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
```

* Import `DELETE_ALBUM` action type into `reducer.js` and create a new case for it

```js
// reducer.js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM,
  DELETE_ALBUM
} from '../actions/actionTypes';
const initialState = {
  counter: 0,
  albums: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    case ADD_NEW_ALBUM:
      return state;
    case DELETE_ALBUM:
      return state;
    default:
      return state;
  }
};
export default reducer;
```

* In the Albums component, import `deleteAlbum` from actions and include it in `mapDispatchToActions`
* Create a new button for deleting an album and allow it to dispatch `deleteAlbum()`, passing in an id for the album to delete

```js
// Albums.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums, deleteAlbum } from '../../store/actions/actions';
class Albums extends Component {
  componentDidMount() {
    this.props.onFetchAlbums();
  }
  render() {
    let albumsTable = '';
    if (this.props.albums) {
      const albumsList = this.props.albums
        .sort((a, b) => {
          return (
            a.released.toString().substring(0, 4) -
            b.released.toString().substring(0, 4)
          );
        })
        .map(album => {
          return (
            <tr key={album.id}>
              <td>{album.album}</td>
              <td>{album.artist}</td>
              <td>{album.label}</td>
              <td>{album.released}</td>
              <td>
                <button onClick={() => this.props.onDeleteAlbum(album.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        });
      albumsTable = (
        <table>
          <thead>
            <tr>
              <th>Album</th>
              <th>Artist</th>
              <th>Label</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{albumsList}</tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Albums</h2>
        {albumsTable}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
const mapDispatchToActions = dispatch => {
  return {
    onFetchAlbums: () => dispatch(fetchAlbums()),
    onDeleteAlbum: id => dispatch(deleteAlbum(id))
  };
};
export default connect(mapStateToProps, mapDispatchToActions)(Albums);
```

#### Add Edit buttons

* Create a new action type in `actionTypes.js`

```js
// actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const ADD_NEW_ALBUM = 'ADD_NEW_ALBUM';
export const DELETE_ALBUM = 'DELETE_ALBUM';
export const EDIT_ALBUM = 'EDIT_ALBUM';
```

* Import the new action type into `actions.js`
* Create a `editAlbumSuccess` action creator that takes an object and returns it with the `EDIT_ALBUM` type
  Create an async function that accepts an `id` argument and an object of key value pairs to update and patches the corresponding record

```js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM,
  DELETE_ALBUM,
  EDIT_ALBUM
} from './actionTypes';
import axios from '../../axios';
export const increment = () => {
  return {
    type: INCREMENT
  };
};
export const decrement = () => {
  return {
    type: DECREMENT
  };
};
const fetchAlbumsSuccess = albums => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    albums
  };
};
export const fetchAlbums = () => {
  return dispatch => {
    axios.get('albums').then(response => {
      console.log(response);
      const fetchedAlbums = [];
      response.data.forEach(album => {
        fetchedAlbums.push(album);
      });
      dispatch(fetchAlbumsSuccess(fetchedAlbums));
    });
  };
};
const addNewAlbumSuccess = () => {
  return {
    type: ADD_NEW_ALBUM
  };
};
export const addNewAlbum = newAlbumDetails => {
  return dispatch => {
    axios
      .post('albums/', newAlbumDetails)
      .then(response => {
        console.log(response);
        dispatch(addNewAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
const deleteAlbumSuccess = () => {
  return {
    type: DELETE_ALBUM
  };
};
export const deleteAlbum = id => {
  return dispatch => {
    axios
      .delete('albums/' + id)
      .then(response => {
        console.log(response);
        dispatch(deleteAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
const editAlbumSuccess = () => {
  return {
    type: EDIT_ALBUM
  };
};
export const editAlbum = (id, updatedAlbumDetails) => {
  return dispatch => {
    axios
      .patch('albums/' + id, updatedAlbumDetails)
      .then(response => {
        console.log(response);
        dispatch(editAlbumSuccess());
        dispatch(fetchAlbums());
      })
      .catch(err => console.log(err));
  };
};
```

* Import `EDIT_ALBUM` action type into `reducer.js` and create a new case for it

```js
// reducer.js
import {
  INCREMENT,
  DECREMENT,
  FETCH_ALBUMS_SUCCESS,
  ADD_NEW_ALBUM,
  DELETE_ALBUM,
  EDIT_ALBUM
} from '../actions/actionTypes';
const initialState = {
  counter: 0,
  albums: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.albums
      };
    case ADD_NEW_ALBUM:
      return state;
    case DELETE_ALBUM:
      return state;
    case EDIT_ALBUM:
      return state;
    default:
      return state;
  }
};
export default reducer;
```

* In the Albums component, import `editAlbum` from actions and include it in `mapDispatchToActions`
* Conditionally render a new form for editing an album and allow it to dispatch `editAlbum()`, passing in an `id` for the album to edit, as well as the updated album object

```js
// Albums.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAlbums,
  deleteAlbum,
  editAlbum
} from '../../store/actions/actions';
class Albums extends Component {
  state = {
    editing: {
      id: null,
      album: '',
      artist: '',
      label: '',
      released: ''
    }
  };
  componentDidMount() {
    this.props.onFetchAlbums();
  }
  updateAlbum() {
    this.props.onEditAlbum(this.state.editing.id, this.state.editing);
    this.setState({
      editing: {
        id: null,
        album: '',
        artist: '',
        label: '',
        released: ''
      }
    });
  }
  render() {
    let albumsTable = '';
    if (this.props.albums) {
      const albumsList = this.props.albums.map(album => {
        if (album.id === this.state.editing.id) {
          return (
            <tr key={this.state.editing.id}>
              <td>
                <input
                  type="text"
                  value={this.state.editing.album}
                  onChange={event =>
                    this.setState({
                      editing: {
                        ...this.state.editing,
                        album: event.target.value
                      }
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.editing.artist}
                  onChange={event =>
                    this.setState({
                      editing: {
                        ...this.state.editing,
                        artist: event.target.value
                      }
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.editing.label}
                  onChange={event =>
                    this.setState({
                      editing: {
                        ...this.state.editing,
                        label: event.target.value
                      }
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.editing.released}
                  onChange={event =>
                    this.setState({
                      editing: {
                        ...this.state.editing,
                        released: event.target.value
                      }
                    })
                  }
                />
              </td>
              <td>
                <button onClick={() => this.updateAlbum()}>Save</button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr
              key={album.id}
              onClick={() =>
                this.setState({
                  editing: {
                    id: album.id,
                    album: album.album,
                    artist: album.artist,
                    label: album.label,
                    released: album.released
                  }
                })
              }
            >
              <td>{album.album}</td>
              <td>{album.artist}</td>
              <td>{album.label}</td>
              <td>{album.released}</td>
              <td>
                <button onClick={() => this.props.onDeleteAlbum(album.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      });
      albumsTable = (
        <table>
          <thead>
            <tr>
              <th>Album</th>
              <th>Artist</th>
              <th>Label</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>{albumsList}</tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Albums</h2>
        {albumsTable}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
const mapDispatchToActions = dispatch => {
  return {
    onFetchAlbums: () => dispatch(fetchAlbums()),
    onDeleteAlbum: id => dispatch(deleteAlbum(id)),
    onEditAlbum: (id, updateAlbum) => dispatch(editAlbum(id, updateAlbum))
  };
};
export default connect(mapStateToProps, mapDispatchToActions)(Albums);
```

## TODO: Redux Full Stack - 005_redux-mongo-express

## TODO: Apollo - 006_apollo

## TODO: Context API - 007_context-api

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
