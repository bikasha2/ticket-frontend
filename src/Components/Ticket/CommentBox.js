import React, { useState, useRef } from "react";
import cn from "classnames";
import "./style.css";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_HEIGHT = 46;

const commentTicketToast = () => {
    toast.success('Comment has been added successfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const CommentBox = ({userToken, getData, id}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setcomments] = useState("");

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    }
    const onChange = (e) => {
        setcomments(e.target.value);
    }
    const onClose = () => {
        setcomments("");
        setIsExpanded(false);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send the form data somewhere')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        
        // Request Body
        axios.put(`https://ticket-backend-eqk1.onrender.com/api/ticket/comment/${id}`, { comments }, config)
            .then(function (response) {
                getData(userToken)
                commentTicketToast()
            })
        setcomments("");
       
       
    }


    return (
        <form
            onSubmit={onSubmit}
            ref={containerRef}
            className={cn("comment-box", {
                expanded: isExpanded,
                collapsed: !isExpanded,
                modified: comments.length > 0,
            })}
            style={{
                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
            }}
        >

            <label htmlFor="comment">What are your thoughts?</label>
            <textarea
                ref={textRef}
                onClick={onExpand}
                onFocus={onExpand}
                onChange={onChange}
                className="comment-field"
                placeholder="What are your thoughts?"
                value={comments}
                name="comment"
                id="comment"
            />
            <textarea />

            <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                    Cancel
                </button>
                <button onClick={e => submitHandler(e)} type="submit" disabled={comments.length < 1}>
                    Post Comment
                </button>
            </div>
        </form>
    );
};

export default CommentBox;
