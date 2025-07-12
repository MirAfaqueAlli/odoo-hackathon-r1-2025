// Rich Text Editor module

// Common TinyMCE configuration
const commonConfig = {
    menubar: false,
    statusbar: false,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'searchreplace', 'visualblocks', 'fullscreen', 'code',
        'insertdatetime', 'media', 'table', 'emoticons', 'wordcount'
    ],
    toolbar: 'formatselect | bold italic underline strikethrough | ' +
            'bullist numlist | link image emoticons | ' +
            'alignleft aligncenter alignright | forecolor backcolor | ' +
            'undo redo | removeformat',
    content_style: `
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
            font-size: 14px;
            line-height: 1.6;
        }
        p { margin: 0 0 1em 0; }
        img { max-width: 100%; height: auto; }
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: #6c757d;
            opacity: 0.6;
        }
    `,
    formats: {
        bold: { inline: 'strong' },
        italic: { inline: 'em' },
        underline: { inline: 'u' },
        strikethrough: { inline: 'strike' }
    },
    block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
    height: 250,
    placeholder: 'Start typing...',
    paste_data_images: true,
    automatic_uploads: true,
    images_upload_handler: handleImageUpload,
    emoticons_database: 'emojis',
    file_picker_types: 'image',
    setup: function(editor) {
        editor.on('change', function() {
            editor.save(); // Ensure form validation works
        });
    }
};

// Initialize rich text editors
function initializeRichTextEditors() {
    // Initialize the question editor
    tinymce.init({
        ...commonConfig,
        selector: '#questionContent',
        height: 300,
        placeholder: 'Provide more details about your question...'
    });

    // Initialize answer editors
    initializeAnswerEditors();
}

// Initialize answer editors
function initializeAnswerEditors() {
    tinymce.remove('.answer-input'); // Remove any existing editors
    tinymce.init({
        ...commonConfig,
        selector: '.answer-input',
        height: 200,
        placeholder: 'Write your answer...',
        toolbar: 'bold italic underline | bullist numlist | link emoticons | alignleft aligncenter alignright | undo redo' // Simplified toolbar for answers
    });
}

// Handle image uploads
function handleImageUpload(blobInfo, progress) {
    return new Promise((resolve, reject) => {
        // Check file size (max 5MB)
        if (blobInfo.blob().size > 5 * 1024 * 1024) {
            reject('Image file too large. Maximum size is 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function() {
            // In a real app, you'd upload to a server
            // For demo, we'll use base64
            resolve(reader.result);
        };
        reader.onerror = function() {
            reject('Failed to read file');
        };
        reader.readAsDataURL(blobInfo.blob());
    });
}

// Get editor content
function getEditorContent(editorId) {
    const editor = tinymce.get(editorId);
    return editor ? editor.getContent() : '';
}

// Set editor content
function setEditorContent(editorId, content) {
    const editor = tinymce.get(editorId);
    if (editor) {
        editor.setContent(content);
    }
}

// Clear editor content
function clearEditorContent(editorId) {
    setEditorContent(editorId, '');
}

export {
    initializeRichTextEditors,
    initializeAnswerEditors,
    getEditorContent,
    setEditorContent,
    clearEditorContent
}; 