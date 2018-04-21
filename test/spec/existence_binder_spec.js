import { bindNode as defiBindNode } from 'defi';
import { bindNode as matreshkaBindNode } from 'matreshka';
import { existence } from '../../src';

const bindNode = process.env.LIBRARY === 'defi' ? defiBindNode : matreshkaBindNode;

describe('Existence binder', () => {
    const noDebounceFlag = {
        debounceSetValue: false,
        debounceGetValue: false
    };

    let obj;
    let node;
    let parent;

    beforeEach(() => {
        obj = {};
        node = window.document.createElement('div');
        node.innerHTML = '<div><i class="foo" id="foo"></i></div>';
        parent = window.document.createElement('div');
        parent.appendChild(node);
    });

    it('should allow to use exitence binder', () => {
        node.id = 'foo';
        node.className = 'bar baz';

        obj.x = false;
        bindNode(obj, 'x', node, existence(), noDebounceFlag);

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('#comment');
        expect(parent.childNodes[0].nodeValue).toEqual('DIV#foo.bar.baz');

        obj.x = true;

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].tagName).toEqual('DIV');

        obj.x = false; // try again

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('#comment');
        expect(parent.childNodes[0].nodeValue).toEqual('DIV#foo.bar.baz');

        obj.x = true; // try again

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].tagName).toEqual('DIV');
    });

    it('should allow to use exitence binder with reverse behavior', () => {
        node.id = 'foo';
        node.className = 'bar baz';

        obj.x = false;
        bindNode(obj, 'x', node, existence(false), noDebounceFlag);

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('DIV');

        obj.x = true;

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('#comment');
        expect(parent.childNodes[0].nodeValue).toEqual('DIV#foo.bar.baz');

        obj.x = false; // try again

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('DIV');

        obj.x = true; // try again

        expect(parent.childNodes.length).toEqual(1);
        expect(parent.childNodes[0].nodeName).toEqual('#comment');
        expect(parent.childNodes[0].nodeValue).toEqual('DIV#foo.bar.baz');
    });
});
