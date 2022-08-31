import React from 'react';

const logErrorToMyService = (error, errorInfo) => {
  // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок.
};

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида.
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
