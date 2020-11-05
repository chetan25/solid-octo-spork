import React, { Component } from "react";
import './error-boundary.styles.scss';

class ErrorBoundary extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    //catches any error thrown in children
    static getDerivedStateFromError(error: Error) {
        //returns a new state
        return { hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        //log or perform side effect
        console.log(error);
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className='error-image-overlay'>
                    <div className='error-image-container' style={{
                        backgroundImage: `url('images/error.png')`
                    }}>
                    </div>
                    <h2 className='error-image-text'>
                        Something went wrong
                    </h2>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;