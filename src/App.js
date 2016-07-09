import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { mouseTrap } from 'react-mousetrap';

import styles from '../assets/sass/style.scss';

import Header from './components/Header';

import Row from './components/Row';
import Col from './components/Col';

import Item from './components/Item';
import Heading from './components/Heading';
import Dropdown from './components/Dropdown';
import Directions from './components/Directions';
import Preview from './components/Preview';

const languages = {
    js: {
        name: 'Javascript',
        directions: 'To simplify date methods in javascript the <a href="http://momentjs.com" target="_blank">moment.js</a> library is required.',
        previewFormat: "moment().format('$')",
    },
    php: {
        name: 'PHP',
        directions: 'php documentation on the <a href="http://php.net/manual/en/function.date.php" target="_blank">date method</a>',
        previewFormat: "date('$')",
    },
    ruby: {
        name: 'Ruby',
        directions: 'ruby documentation on the <a href="http://ruby-doc.org/core-2.2.0/Time.html#method-i-strftime" target="_blank">strftime method</a>',
        previewFormat: 'Time.new().strftime "$"',
    },
    python: {
        name: 'Python',
        directions: 'python documentation on the <a href="https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior" target="_blank">strftime method</a>',
        previewFormat: "time.strftime('$')",
    },
};

let langaugesDropdown = [];

for(let key in languages) {
    let value = key;
    let label = languages[key].name;
    langaugesDropdown.push({ value, label });
}

const App = React.createClass({
    getInitialState() {
        return {
            language: 'js',
            preview: [],
            livePreview: '',
        }
    },
    componentWillMount() {
        this.props.bindShortcut('space', this.onSpace);
        this.props.bindShortcut('backspace', this.onBackspace);

        setInterval(() => {
            if(this.state.preview.length == 0) {
                this.setState({ livePreview: '' });
            } else {
                this.setState({ livePreview: moment().format(this.renderCode('js')) });
            }
        }, 1000);
    },
    onSpace(e) {
        let preview = this.state.preview;
        preview.push({ key: true, value: ' ' });
        this.setState({ preview });
        e.preventDefault();
    },
    onBackspace(e) {
        let preview = this.state.preview;
        preview.pop();
        this.setState({ preview });
        e.preventDefault();
    },
    onLanguageSelect(e) {
        this.setState({ language: e.target.value });
    },
    selectItem(formats) {
        let preview = this.state.preview;
        preview.push(formats);
        this.setState({ preview });
    },
    onReset(e) {
        this.setState({ preview: [] });
        e.preventDefault();
    },
    renderCode(type = null) {

        let preview = [];
        let language = this.state.language;

        if(type != null) {
            language = type;
        }

        _.each(this.state.preview, (formats) => {
            if(formats.key) {
                preview.push(formats.value);
            } else {
                preview.push(formats[language]);
            }
        });

        if(this.state.preview.length == 0) {
            return '';
        }

        preview = preview.join('');
        return preview;

    },
    render() {

        return (
            <div className="container-fluid">
                <Row>
                    <Header />
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="hr"></div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="form-group col-xs-12">
                            <label htmlFor="language">Language</label>
                            <Dropdown name='language' options={langaugesDropdown} onSelect={this.onLanguageSelect} />
                            <Directions type={this.state.language}>{languages[this.state.language].directions}</Directions>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Presets</Heading>
                        <Item
                            preset={true}
                            language={this.state.language}
                            formats={{
                                js: 'dddd, MMMM D YYYY',
                                php: 'l, F j Y',
                                ruby: '%A, %B %e %Y',
                                python: '%A, %B %d %Y',
                            }}
                            onClick={this.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.state.language}
                            formats={{
                                js: 'MM/DD/YYYY',
                                php: 'm/d/Y',
                                ruby: '%m/%d/%Y',
                                python: '%m/%d/%Y',
                            }}
                            onClick={this.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.state.language}
                            formats={{
                                js: 'MMMM YYYY',
                                php: 'F Y',
                                ruby: '%B %Y',
                                python: '%B %Y',
                            }}
                            onClick={this.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.state.language}
                            formats={{
                                js: 'MMM D, YYYY',
                                php: 'M j, Y',
                                ruby: '%B %e, %Y',
                                python: '%B %d, %Y',
                            }}
                            onClick={this.selectItem}
                        />
                        <Item
                            preset={true}
                            live={true} language={this.state.language}
                            formats={{
                                js: 'YYYY-MM-DD HH:mm:ss',
                                php: 'Y-m-d H:i:s',
                                ruby: '%Y-%m-%d %H:%M:%S',
                                python: '%Y-%m-%d %H:%M:%S',
                            }}
                            onClick={this.selectItem}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Day of Month</Heading>
                        <Row>
                            <Item
                                language={this.state.language}
                                desc='2 digits with leading zeros'
                                formats={{
                                    js: 'D',
                                    php: 'j',
                                    ruby: '%e',
                                }}
                                colWrapper={true}
                                onClick={this.selectItem}
                            />
                            <Item
                                language={this.state.language}
                                desc='without leading zeros with suffix'
                                formats={{
                                    js: 'Do',
                                    php: 'jS',
                                }}
                                colWrapper={true}
                                onClick={this.selectItem}
                            />
                            <Item
                                language={this.state.language}
                                desc='2 digits with leading zeros'
                                formats={{
                                    js: 'DD',
                                    php: 'd',
                                    ruby: '%d',
                                    python: '%d',
                                }}
                                colWrapper={true}
                                onClick={this.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>

                <Preview
                    format={languages[this.state.language].previewFormat}
                    language={languages[this.state.language].name}
                    code={this.renderCode()}
                    live={this.state.livePreview}
                    onReset={this.onReset}
                />
            </div>
        );
    }
});

export default mouseTrap(App);
