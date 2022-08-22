import { Component } from 'react';

import { NewAPI } from './API/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';



export class App extends Component {
  state = {
    query: '',
    data: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    imgId: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', data: [], page: 1 }, this.getPicture);
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setstate({ status: 'pending' }, this.getPicture);
    }
  }

  getPicture = () => {
    const { query } = this.state;
    const { page } = this.state;
    NewAPI(query, page)
      .then(this.dataProcessing)
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataProcessing = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      this.setState({
        status: 'rejected',
        error: new Error('Try to change the request'),
      });
      return;
    }

    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    const newData = dataArray.map(data => {
      const {
        id,
        largeImageUrl: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    }
    )
  }


  render() {
    const { status, error, data, showModal, total } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {data.length > 0 && (
          <ImageGallery data={this.state.data} onClick={this.clickOnImage} />
        )}
        {status === 'resolved' && data.length > 0 && data.length < total && (
          <>
            <Button onClick={this.handleLoadMore} />
          </>
        )}

        {status === 'pending' && (
          <div className={styles.ToWatch}>
            <ToWatch
              color="00BFFF"
              height={200}
              width={200}
              arialabel="loading"
            />
          </div>
        )}

        {status === 'rejected' && (
          <div className={styles.ImageGallery}>
            <p>{'Something went wrong! ${error}'}</p>
          </div>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.handleData().imageURL} alt={this.handleData().alt} />
          </Modal>
        )}
      </div>
    );
  }
}







// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
