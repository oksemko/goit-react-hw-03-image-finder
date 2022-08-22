import { Component } from 'react';

import { NewAPI } from './API/API';
import { Searchbar } from './Searchbar/Searchbar';


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
