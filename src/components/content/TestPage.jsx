import { useEffect, useRef, useState } from 'react'
import React from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';

/*The page that will be the proof of concept for the functions. Right now, it only tests the
disappearing text function, and not even it being set or not set by a user, just a proof that
the idea can work. */
export default function TestPage() {
    //a state variable that determines if text is being shown. Written so that the text is gone even on page reload. If possible,
    //I want to store the changes in someones account as well (if the user aka the writer wants it to be that permanent)
    const [showText, setShowText] = useState(() => {
    const stored = sessionStorage.getItem("testText1");
    //if testText1 doesnt exist, create it and make showText true
    if (stored === null) {
        sessionStorage.setItem("testText1", "true");
        return true;
    }
    //if it already exists, and is still true, set showText to true
    if (stored === "true") {
        return true;
    } 
    //if it exists and is false, set showText to false
    else {
        return false;
    }
    });

    //a reference for the text to be deleted. Used to know where the text is
    const textRef = useRef();

    //define what happens when handleScroll is called
    const handleScroll = () => {
    if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        if (rect.bottom < 0) {
            setShowText(false);
            sessionStorage.setItem("testText1", false);
        }
    }
    };


    //use useEffect so you only add the event listner on startup
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        //Cleanup function, runs when everything is done.
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div style={{ height: '2000px', padding: '4rem' }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcorper sapien id rutrum bibendum. Pellentesque viverra metus vel elementum convallis. Fusce viverra massa mi, sed ullamcorper elit lobortis id. Curabitur venenatis nunc mi, in congue lectus molestie non. Etiam pharetra augue sed libero convallis luctus. Praesent cursus, ante eleifend dignissim laoreet, lacus orci gravida ipsum, condimentum lobortis velit est egestas leo. Pellentesque non enim commodo, convallis diam vel, viverra magna. Nullam vitae porttitor turpis. Integer commodo ligula eu enim gravida, nec vestibulum enim interdum. Maecenas mattis ac nibh eget cursus.

Integer nec efficitur elit, quis pulvinar sapien. Integer bibendum felis id diam pellentesque, et vulputate est lobortis. Sed ullamcorper, justo nec mattis faucibus, sem felis finibus velit, sed hendrerit augue nisl eget purus. Donec id gravida arcu. Phasellus fermentum luctus consectetur. Duis enim felis, tempus eu hendrerit nec, egestas at lectus. Sed ut sollicitudin ante. Aenean euismod quis mi non dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris et tortor dui. Nam faucibus, nisi sed placerat sagittis, metus enim dapibus urna, sit amet sodales augue nisl non ligula. Vestibulum metus leo, viverra quis diam eget, pulvinar commodo turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Nunc efficitur, quam non dictum congue, felis ipsum finibus felis, vitae mattis magna eros nec mauris. Suspendisse nec mi sed orci tristique vehicula. Nullam euismod lacus risus, sodales mollis risus varius eu. Maecenas ut ipsum vitae nibh semper hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fermentum ipsum eget commodo sodales. Praesent eu tempor diam. Nunc elementum neque pharetra libero laoreet egestas. Sed facilisis lobortis dignissim. Nullam euismod imperdiet dolor, vel placerat eros hendrerit ut. Vestibulum suscipit cursus justo, sit amet euismod nunc ultricies ut. Maecenas et odio vitae diam imperdiet fermentum.

Vestibulum fringilla tortor ac ipsum commodo tincidunt. Sed convallis, felis sit amet posuere imperdiet, magna magna condimentum dui, eget vulputate dui erat vitae nibh. Phasellus semper egestas laoreet. Suspendisse potenti. Maecenas ac tortor iaculis, pretium nisi at, semper enim.

And her name was:</p>
        {/*For now, just use the basic method of only showing it when showText is true. TODO
        figure out if there is a better way to do this. Otherwise, you will need a state variable for
        every piece of text that might need to be deleted. use visibility so that when its deleted, the space is
        still there for a stronger effect. TODO, make the change permanent */}
        <p
        ref={textRef}
        style={{ visibility: showText ? "visible" : "hidden" }}
        >
        Sara Von Poodle
        </p>


        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcorper sapien id rutrum bibendum. Pellentesque viverra metus vel elementum convallis. Fusce viverra massa mi, sed ullamcorper elit lobortis id. Curabitur venenatis nunc mi, in congue lectus molestie non. Etiam pharetra augue sed libero convallis luctus. Praesent cursus, ante eleifend dignissim laoreet, lacus orci gravida ipsum, condimentum lobortis velit est egestas leo. Pellentesque non enim commodo, convallis diam vel, viverra magna. Nullam vitae porttitor turpis. Integer commodo ligula eu enim gravida, nec vestibulum enim interdum. Maecenas mattis ac nibh eget cursus.

Integer nec efficitur elit, quis pulvinar sapien. Integer bibendum felis id diam pellentesque, et vulputate est lobortis. Sed ullamcorper, justo nec mattis faucibus, sem felis finibus velit, sed hendrerit augue nisl eget purus. Donec id gravida arcu. Phasellus fermentum luctus consectetur. Duis enim felis, tempus eu hendrerit nec, egestas at lectus. Sed ut sollicitudin ante. Aenean euismod quis mi non dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris et tortor dui. Nam faucibus, nisi sed placerat sagittis, metus enim dapibus urna, sit amet sodales augue nisl non ligula. Vestibulum metus leo, viverra quis diam eget, pulvinar commodo turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Nunc efficitur, quam non dictum congue, felis ipsum finibus felis, vitae mattis magna eros nec mauris. Suspendisse nec mi sed orci tristique vehicula. Nullam euismod lacus risus, sodales mollis risus varius eu. Maecenas ut ipsum vitae nibh semper hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fermentum ipsum eget commodo sodales. Praesent eu tempor diam. Nunc elementum neque pharetra libero laoreet egestas. Sed facilisis lobortis dignissim. Nullam euismod imperdiet dolor, vel placerat eros hendrerit ut. Vestibulum suscipit cursus justo, sit amet euismod nunc ultricies ut. Maecenas et odio vitae diam imperdiet fermentum.

Vestibulum fringilla tortor ac ipsum commodo tincidunt. Sed convallis, felis sit amet posuere imperdiet, magna magna condimentum dui, eget vulputate dui erat vitae nibh. Phasellus semper egestas laoreet. Suspendisse potenti. Maecenas ac tortor iaculis, pretium nisi at, semper enim.
<br /><br />
Wait, what was the victims name again?</p>
        </div>
        ) 
}