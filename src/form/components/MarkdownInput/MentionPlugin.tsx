import React from 'react';
import clsx from 'clsx';
import style from './MentionPlugin.module.scss';
import { PluginComponent } from 'react-markdown-editor-lite';

interface CounterState {
    isMentioning: boolean;
    mentionName: string;
    [id: string]: any;
}

function replaceBetween(origin, startIndex, endIndex, insertion) {
    return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
}

export default class MentionPlugin extends PluginComponent<CounterState> {
    // Define plugin name here, must be unique
    static pluginName = 'mention';
    // Define which place to be render, default is left, you can also use 'right'
    static align = 'left';
    // Define default config if required
    static defaultConfig = {
        onChange: searchingText => { }
    }

    private defaultState = {
        isMentioning: false,
        mentionName: '',
        mentionsList: [],
        activeListItem: -1,
    };

    private mentionSymbolIndex = -1;

    public state = { ...this.defaultState }

    private ignoredKeys = [
        'shift',
        'control',
        'alt',
    ];

    private text: string = this.editor.getMdValue();

    private mentionAcceptancePattern = /[a-zA-Z0-9\.\_]/;

    private mentionsListRefsList = {};

    public constructor(props) {
        super(props);

        this.selectedMentioned = this.selectedMentioned.bind(this);
        this.setElementRef = this.setElementRef.bind(this);
    }

    private setElementRef(element, index) {
        this.mentionsListRefsList[index] = element;
    }

    public value() {
        return this.editor.getMdValue();
    }

    private selectedMentioned(mentioned) {
        const text = this.value();

        this.editor.setText(replaceBetween(text, this.mentionSymbolIndex, this.mentionSymbolIndex + this.state.mentionName.length + 1, '@' + mentioned.value));

        this.editor.setSelection({
            start: this.editor.getSelection().start,
            end: this.editor.getSelection().end + (mentioned.value.length - this.state.mentionName.length)
        })

        this.resetState();
    }

    private resetState() {
        this.setState({ ...this.defaultState });
    }

    public detectKeyboard(e) {
        // const value = e.target.value;
        // const lastChar = value.charAt(value.length - 1);
        const lastChar = e.key;

        if (this.ignoredKeys.includes(lastChar.toLowerCase())) return;

        if (lastChar === 'Backspace') {
            this.text = this.text.slice(0, -1);
        } else if (lastChar === 'Enter') {
            this.text += '\n';
        } else if (lastChar === 'Tab') {
            this.text += '\t';
        } else {
            this.text += lastChar;
        }

        if (['ArrowUp', 'ArrowDown'].includes(lastChar) && this.state.mentionsList.length > 0) {
            let activeIndex = null;
            if (lastChar === 'ArrowUp') {
                // if -1 and pressed arrow up
                // then the user has not navigated to any of the mentions list
                // then go to last element in the list
                if ([-1, 0].includes(this.state.activeListItem)) {
                    activeIndex = this.state.mentionsList.length - 1;
                } else {
                    activeIndex = this.state.activeListItem - 1;
                }
            } else if (lastChar === 'ArrowDown') {
                // if -1 and pressed arrow down
                // then the user has not navigated to any of the mentions list
                // then go to first element in the list
                if (this.state.activeListItem === -1 || this.state.activeListItem === this.state.mentionsList.length - 1) {
                    activeIndex = 0;
                } else {
                    activeIndex = this.state.activeListItem + 1;
                }
            }

            if (activeIndex !== null) {
                e.preventDefault();
                this.focusOn(activeIndex);
            }

            return;
        }

        if (lastChar === 'Enter' && this.state.activeListItem !== -1) {
            e.preventDefault();
            return this.selectedMentioned(this.state.mentionsList[this.state.activeListItem]);
        }

        if (!this.state.isMentioning) {
            if (lastChar === '@') {
                this.set('isMentioning', true);
                this.mentionSymbolIndex = this.editor.getSelection().end;
            } else {
                // const text = this.text;
                // const mentionLetters = [];

                // for (let index = this.editor.getSelection().end; index >= 0; index--) {
                //     if (!text[index] || (text[index].match(this.mentionAcceptancePattern) === null && text[index] !== '@')) break;

                //     if (text[index] !== '@') {
                //         mentionLetters.push(text[index]);
                //     } else {
                //         this.mentionSymbolIndex = index;
                //         const mentionedText = mentionLetters.reverse().join('');
                //         this.set('mentionName', mentionedText);

                //         console.log(mentionedText);

                //         if (this.props.config.onChange) {
                //             this.props.config.onChange(mentionedText).then(mentions => {
                //                 this.set('mentionsList', mentions);
                //             });
                //         }
                //         break;
                //     }
                // }
            }
        } else if (this.state.isMentioning) {
            if (lastChar === 'Backspace' && this.state.mentionName.length > 0) {
                const newMentionName = this.state.mentionName.slice(0, -1);
                this.set('mentionName', newMentionName);
            } else if (!lastChar.match(this.mentionAcceptancePattern) || lastChar === 'Enter' || lastChar === 'Backspace') {
                this.resetState();
            } else {
                const mentionedText = this.state.mentionName + lastChar;
                this.set('mentionName', mentionedText);

                if (this.props.config.onChange) {
                    this.props.config.onChange(mentionedText).then(mentions => {
                        this.set('mentionsList', mentions);
                    });
                }
            }
        }
    }

    protected focusOn(activeIndex) {
        this.mentionsListRefsList[activeIndex].focus();
        this.set('activeListItem', activeIndex);
    }

    protected set(stateKey: any, value) {
        this.setState({
            ...this.state,
            [stateKey]: value
        });
    }

    componentDidMount() {
        this.editor.on('keydown', this.detectKeyboard.bind(this));
        this.editor.on('blur', this.closeMentionList.bind(this));
    }

    closeMentionList() {
        this.resetState();
    }

    componentWillUnmount() {
        this.editor.off('keydown', this.detectKeyboard.bind(this));
        this.editor.off('blur', this.closeMentionList.bind(this));
    }

    render() {
        if (!this.state.mentionName) return null;

        return (
            <div className={style.root}>
                {this.state.mentionsList.map((mention, index) => (
                    <div
                        // tabIndex={index}
                        // tabIndex={-1}
                        tabIndex={0}
                        onMouseEnter={() => this.focusOn(index)}
                        ref={element => this.setElementRef(element, index)}
                        key={mention.value + index}
                        onClick={() => this.selectedMentioned(mention)}
                        className={clsx(style.mentionItem, {
                            [style.activeItem]: this.state.activeListItem === index,
                        })}
                    >
                        {mention.label}
                    </div>
                ))}
            </div>
        )
    }
}
