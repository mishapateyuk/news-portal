import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: props.modalIsShown,
    };
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
  };

  modalButtonHandler() {
    this.props.modalButtonHandler();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShown: nextProps.modalIsShown,
    });
  };

  render() {
    const isShown = this.state.isShown;
    const className = isShown ? 'show' : '';
    return (
     <div className={`modal ${className}`}>
        <div className="modal-wrapper">
          <div className="close" onClick={this.props.toggleModal} />
          {this.props.children}
        </div>
      </div>
    );
  };
};

Modal.defaultProps = {
  modalIsShown: false,
};

export default Modal;
