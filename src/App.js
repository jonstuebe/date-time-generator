import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { mouseTrap } from 'react-mousetrap';

import styles from './sass/style.scss';

import ItemContainer from './containers/ItemContainer';

import Header from './components/Header';

import Dropdown from './components/Dropdown';
import Directions from './components/Directions';

import Row from './components/Row';
import Col from './components/Col';

import Preview from './components/Preview';

const languages = {
    js: {
        name: 'Javascript',
        directions: 'To simplify date methods in javascript the <a href="http://momentjs.com" target="_blank">moment.js</a> library is required.',
        previewFormat: 'moment().format(\'$\')',
    },
    php: {
        name: 'PHP',
        directions: 'php documentation on the <a href="http://php.net/manual/en/function.date.php" target="_blank">date method</a>',
        previewFormat: 'date(\'$\')',
    },
    ruby: {
        name: 'Ruby',
        directions: 'ruby documentation on the <a href="http://ruby-doc.org/core-2.2.0/Time.html#method-i-strftime" target="_blank">strftime method</a>',
        previewFormat: 'Time.new().strftime "$"',
    },
    python: {
        name: 'Python',
        directions: 'python documentation on the <a href="https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior" target="_blank">strftime method</a>',
        previewFormat: 'time.strftime(\'$\')',
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
        this.props.bindShortcut('backspace', this.onBackspace);
        this.props.bindShortcut([':',',','/','-','.','(',')','space'], this.onShortcuts);

        setInterval(() => {
            if(this.state.preview.length == 0) {
                this.setState({ livePreview: '' });
            } else {
                this.setState({ livePreview: moment().format(this.renderCode('js')) });
            }
        }, 1000);
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
    onShortcuts(e) {

        let preview = this.state.preview;

        switch (e.code) {
            case 'Space':
                preview.push({ key: true, value: ' ' });
                break;
            case 'Comma':
                preview.push({ key: true, value: ',' });
                break;
            case 'Semicolon':
                preview.push({ key: true, value: ':' });
                break;
            case 'Period':
                preview.push({ key: true, value: '.' });
                break;
            case 'Slash':
                preview.push({ key: true, value: '/' });
                break;
            case 'Minus':
                preview.push({ key: true, value: '-' });
                break;
            case 'Digit9':
                preview.push({ key: true, value: '(' });
                break;
            case 'Digit0':
                preview.push({ key: true, value: ')' });
                break;
        }

        this.setState({ preview });
        e.preventDefault();
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

                <ItemContainer
                    language={this.state.language}
                    selectItem={this.selectItem}
                />

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
