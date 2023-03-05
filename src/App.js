import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  pictureSubmit: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
  },
  entries: 0,
};

let setTimer;

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: JSON.parse(localStorage.getItem('imageUrl')) || '',
      box: JSON.parse(localStorage.getItem('box')) || [],
      route: JSON.parse(localStorage.getItem('route')) || 'signin',
      isSignedIn: JSON.parse(localStorage.getItem('isSignedIn')) || false,
      pictureSubmit: JSON.parse(localStorage.getItem('pictureSubmit')) || false,
      user: JSON.parse(localStorage.getItem('user')) || {
        id: '',
        name: '',
        email: '',
        joined: '',
      },
      entries: JSON.parse(localStorage.getItem('entries')) || 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    this.forceUpdate();
    clearTimeout(setTimer);
    setTimer = setTimeout(() => {
      if (this.state.pictureSubmit === true) {
        this.onPictureSubmit();
      }
    }, '50');
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState, () => {
        localStorage.clear();
      });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true }, () => {
        localStorage.setItem(
          'isSignedIn',
          JSON.stringify(this.state.isSignedIn)
        );
      });
    }
    this.setState({ route: route }, () => {
      localStorage.setItem('route', JSON.stringify(this.state.route));
    });
  };

  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          joined: data.joined,
        },
      },
      () => {
        localStorage.setItem('user', JSON.stringify(this.state.user));
      }
    );
    this.setState({ entries: data.entries }, () => {
      localStorage.setItem('entries', JSON.stringify(this.state.entries));
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const outputArray = data.outputs[0].data.regions.map((item) => {
      return {
        leftCol: item.region_info.bounding_box.left_col * width,
        topRow: item.region_info.bounding_box.top_row * height,
        rightCol: width - item.region_info.bounding_box.right_col * width,
        bottomRow: height - item.region_info.bounding_box.bottom_row * height,
      };
    });
    return outputArray;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box }, () => {
      localStorage.setItem('box', JSON.stringify(this.state.box));
    });
  };

  pictureSubmitState = () => {
    this.setState({ pictureSubmit: false }, () => {
      localStorage.setItem(
        'pictureSubmit',
        JSON.stringify(this.state.pictureSubmit)
      );
    });
  };

  onPictureSubmit = (event) => {
    if (this.state.input === '') {
      this.setState(
        { input: JSON.parse(localStorage.getItem('imageUrl')) },
        () => {
          fetch('https://smart-brain-api-1ywf.onrender.com/imageurl', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              input: this.state.input,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              this.displayFaceBox(this.calculateFaceLocation(response));
              this.setState({ input: '' });
            })
            .catch((err) => console.log(err));
        }
      );
      return;
    }
    this.setState({ pictureSubmit: true }, () => {
      localStorage.setItem(
        'pictureSubmit',
        JSON.stringify(this.state.pictureSubmit)
      );
    });
    this.setState({ imageUrl: this.state.input }, () => {
      localStorage.setItem('imageUrl', JSON.stringify(this.state.imageUrl));
    });
    event.target.previousSibling.value = '';
    if (this.state.input !== '') {
      fetch('https://smart-brain-api-1ywf.onrender.com/imageurl', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            this.setState({ input: '' });
            fetch('https://smart-brain-api-1ywf.onrender.com/image', {
              method: 'put',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState({ entries: count }, () => {
                  localStorage.setItem('entries', JSON.stringify(count));
                });
              })
              .catch((err) => console.log(err));
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
          this.setState({ input: '' });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { isSignedIn, pictureSubmit, imageUrl, route, box } = this.state;
    return (
      <div className='App'>
        <ParticlesBg
          className='particles'
          type='cobweb'
          bg={true}
          num={180}
          color='#ffffff'
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          !pictureSubmit ? (
            <div className='outer-container'>
              <div className='main-container'>
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.entries}
                />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onPictureSubmit={this.onPictureSubmit}
                />
              </div>
            </div>
          ) : (
            <FaceRecognition
              pictureSubmitState={this.pictureSubmitState}
              box={box}
              imageUrl={imageUrl}
            />
          )
        ) : route === 'signin' || route === 'signout' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
