// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import '../../index.css'
import { Button } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { Node } from '@tiptap/core'
const DisappearingText = Node.create({
    name: 'disappear',
    group: 'inline',
    inline: true,
    content: 'text*',
    //parse the HTML
    parseHTML() {
        return [{ tag: 'span[data-disappear]' }]
    },
    //render the HTML as gone
   renderHTML({ HTMLAttributes, node }) {
  const isAuthor  = this.options.isAuthor;
  const isVisible = node.attrs.visible !== false;

  if (!isAuthor && !isVisible) {
    return ['span', { style: 'display:none;' }, ''];
  }

  // put the label in a data-attr; real text stays untouched
 const attrs = {
  ...HTMLAttributes,
  'data-disappear': '',
  'data-id'      : node.attrs.id,
  class          : 'disappear-text',
};
if (isAuthor) attrs['data-author'] = 'true';

  return ['span', attrs, 0];   
},

    addAttributes() {
    return {
    id: { default: null },
    visible: {
      default: true, // always visible initially
      parseHTML: element => element.getAttribute('data-visible') !== 'false',
      renderHTML: attributes => {
        return {
          'data-visible': attributes.visible.toString(),
        }
      }
    }
    }
    }
})

export default function EditingPage ({ isEditor }) {
    const [plainText, setPlainText] = useState("");
    const observer = useRef(null);
    //TODO, should be set to isEditor but it isnt working right now for some reason
    const [isAuthor, setIsAuthor] = useState(true);


    const editor = useEditor({
        extensions: [StarterKit, DisappearingText],
        content: '<p>Hello World!</p>',
        isAuthor,
        onUpdate({ editor }) {
            if (!observer.current) return;
            const elements = document.querySelectorAll('[data-disappear]');
            elements.forEach(el => observer.current.observe(el)); 
        },
        editorProps: {
            attributes: {
                'data-is-author': isAuthor ? 'true' : 'false',
            },
        },
    });

    /*Reader-mode observer: hide nodes on scroll */
    useEffect(() => {
    if (!editor) return;

    observer.current = new IntersectionObserver((entries) => {
        if (isAuthor) return; 

        for (const entry of entries) {
        /* out of view **and** above the top edge? */
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            const id = entry.target.getAttribute('data-id');
            if (!id) continue;

            const { doc } = editor.state;
            doc.descendants((node, pos) => {
                if (
                node.type.name === 'disappear' &&
                node.attrs.id === id &&
                node.attrs.visible !== false
                ) {
                editor.chain().focus().command(({ tr }) => {
                    tr.setNodeMarkup(pos, undefined, { ...node.attrs, visible: false });
                    return true;
                }).run();
                }
            });
            }
        }
    }, { threshold: 0, root: null });

    /* attach observer */
    const els = document.querySelectorAll('[data-disappear]');
    els.forEach(el => {
        if (!el.dataset.observed) {
        observer.current.observe(el);
        el.dataset.observed = 'true';
        }
    });

    return () => observer.current?.disconnect();
    }, [editor, isAuthor]);              

    /*Author-mode restore: show everything immediately */
    useEffect(() => {
    // run only when we just became author
    if (!editor || !isAuthor) return; 

    const { doc } = editor.state;
    doc.descendants((node, pos) => {
        if (node.type.name === 'disappear' && node.attrs.visible === false) {
        editor.chain().focus().command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, { ...node.attrs, visible: true });
            return true;
        }).run();
        }
    });
    }, [editor, isAuthor]);       


    console.log(plainText);
    return (
        <>
        {/*Wrap everything in a div so we can style it. Width gives it breathing room from the side, and margin 0 auto evenly 
        distributes both sides. */}
        <div style={{width: "85%", margin: "0 auto"} }>
            <h3>Write your story here!</h3>
            {/*the 'editor-container' class is applied to the outer wrapper of the editor. In our CSS, 
            we target '.editor-container .ProseMirror' to style the actual editable area that Tiptap 
            renders inside. 'ProseMirror' is the internal class Tiptap uses for the contentEditable 
            region. */}
            <EditorContent editor={editor} className='editor-container'/>
            {/**<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>*/}
            <BubbleMenu editor={editor} 
            style={styles.bubbleLook}
            >
            <Button
            onClick={() => {
                //grab the text that the user has highlited using state selection
                const selectedText = editor.state.doc.textBetween(editor.state.selection.from,
                    editor.state.selection.to,
                    '\n'
                );
                console.log("Selected text:", selectedText);
                //.chain() lets you chain editor commands, .focus() gives the editor keyboard control, .insertContent inserts content
                //a .run() runs the chain. use cryptography to generate a random, unique ID for each item
                const id = crypto.randomUUID();
                editor.chain().focus().insertContent({
                type: 'disappear',
                attrs: { id },
                content: [
                    {
                    type: 'text',
                    text: selectedText,
                    }
                ],
                }).run();
            }}
            >Test</Button>
            Here, we can place some menu stuff</BubbleMenu>
            <Button style={{marginTop: '2px'}}
            //dont forget to call an arrow function to do setPlainText. Otherwise, it calls setPlainText on 
            //page render, instead of onClick.
            onClick={() => setPlainText(editor.getText())}
            >Save</Button>
            {
            isAuthor ? (
                <Button onClick={() => setIsAuthor(false)}>Test reader view</Button>
            ) : (
                <Button onClick={() => setIsAuthor(true)}>Return to writer view</Button>
            )
            }
        </div>
        </>
    )
}
//make a styles object
const styles = { 
    //the style for the bubble menu
    bubbleLook: {
        backgroundColor: 'gray',
    },
}



    /* Below is old code that implemented a version of the rich text editor. Unfortunaltely, it did not actually support important features,
    or would have otherwise taken a very long time to implement those features
    export default function EditingPage() {
    //use a useRef for the user text because they are going to be typing a lot of stuff. TODO, make sure this is only 
    //filled after a button is clicked, not just when any character is typed
    const usersText = useRef();

    //a function to resize the textbox the user types in. Called for every input, but isnt extremely
    //costly, since it only changes the layout (not React rendering) when needed, which is 
    //when the text overflows the current visible area.
    function resizeTextbox() {
        //get the current text area OBJECT (dom element) from usersText. We want all of the information, not just
        //the string it contains, so we do .current, but not .value
        const textArea = usersText.current;

        //check if the textbox has not yet reached its max height. if it hasn't, we might resize it. 
        //Otherwise, we skip even checking if it needs resized (it doesnt matter)
        console.log(parseInt(getComputedStyle(textArea).maxHeight) + " this is max height");
        console.log(textArea.clientHeight + " this is current height");
        if(textArea.clientHeight <= parseInt(getComputedStyle(textArea).maxHeight)) {
            //check if the textbox has more text in it and needs resized. scrollHeight is the textboxes
            //total height, as measured by its visible height + how much scrolling you can do. 
            //client height is the visible height, aka what the user sees. So if the scrollHeight is
            //greater than the clientHeight, we know that the users text has been pushed off (overflowed) the screen,
            //so we can resize it. The if statement above prevents this from running forever
            if(textArea.scrollHeight > textArea.clientHeight) {
                //set the actual height (style.height) to match the scrollHeight so that all content is visible without overflow.
                //clientHeight represents the visible height, but its read only. We instead change style.height to change the 
                //textboxes height.
                textArea.style.height = textArea.scrollHeight + "px";
            }
        }
    }
    return (
    <Form>
        <Form.Group 
        //This is not a flex item, but a form group, so we dont use classnames like justify content.
        //mx auto makes everything centered, and we give it a width of 85%, giving everything
        //in the form group some breathing room
        className="mx-auto" style={{ width: "85%" }}>
            <Form.Label>Put your words here!</Form.Label>
            <Form.Control 
            //as=textarea makes it so you can resize the textbox. rows changes it default size to better 
            //indicate that lots of text can go here
            as="textarea" rows={6}
            placeholder="Go nuts!"
            //by default, this form control
            ref={usersText}
            //add an onInput to allow for resizing. However, ONLY resize up to a certain
            //height, and only when the amount of text goes past a certain threshold.
            onInput={resizeTextbox}
            //add a style to the textbox.
            style={{
                //if the text overflows the visible area, show a vertical scrollbar. this does not 
                //control whether scrolling is possible (it always is), it only controls whether the
                //scrollbar is *visible* when needed.
                overflowY: "auto",
                //as="textarea" makes the input resizable by default, but CSS controls *how* the user can resize it.
                //We set resize to "vertical" to restrict resizing to up/down only, which helps prevent layout-breaking
                //horizontal stretching (though other things in the code may be preventing that anyways).
                resize: "vertical",
                //sets the maxHeight to 60% of the vertical screen height
                maxHeight: "80vh"
            }}
            />
        </Form.Group>
    </Form>
    )
}*/