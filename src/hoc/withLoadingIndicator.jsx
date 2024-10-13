import { Spin } from 'antd';
import PropTypes from 'prop-types';

const withLoadingIndicator = (WrappedComponent) => {
  const WithLoadingIndicator = ({ loading, ...props }) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };

  WithLoadingIndicator.propTypes = {
    loading: PropTypes.bool,
  };

  WithLoadingIndicator.displayName = 'WithLoadingIndicator';

  return WithLoadingIndicator;
};

export default withLoadingIndicator;