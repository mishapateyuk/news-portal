import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: props.modalSettings.modalIsShown,
    };
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
  };

  modalButtonHandler() {
    this.props.modalSettings.modalButtonHandler();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShown: nextProps.modalSettings.modalIsShown,
    });
  };

  render() {
    const isShown = this.state.isShown;
    const className = isShown ? 'show' : '';
    return (
     <div className={`modal ${className}`}>
        <div className="modal-wrapper">
          <div className="close" onClick={this.props.modalSettings.toggleModal} />
          <h2>{this.props.modalSettings.modalTitle}</h2>
          {this.props.modalSettings.modalChildren}
          <button onClick={this.modalButtonHandler} className="button">
            {this.props.modalSettings.modalButtonText}
          </button>
        </div>
      </div>
    );
  };
};

Modal.defaultProps = {
  modalSettings: {
    modalIsShown: false,
  },
};

export default Modal;
