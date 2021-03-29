import React from 'react';
import styles from './App.scss';
var App = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.wrapper },
            React.createElement("div", { className: styles.content }, children))));
};
export default App;
