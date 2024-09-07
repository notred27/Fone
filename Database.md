## Firebase Document Structure

### `General`: All documents should contain these fields that contain general information.

| FIELD | DATATYPE | DESCRIPTION |
| :--- | :---     | :---        |
| CreatedAt | timestamp | Date and time at which the document was added to firebase.
| createdBy | string | uid of the user that created this document.
<!-- | obj | string | Signifies what type of component this document represents. -->


<br/>

### `Chatroom`: A document that represents a Chatroom component.
| FIELD | DATATYPE | VALUE | DESCRIPTION |
| :--- | :---   | :---  | :---        |
| style | string | ["imessage" \| "sms" \| "gmessage" \| "whatsapp"] | The theme of the chatroom.
| messageflair | string|  ["" \| "seen" \| "delivered"] | Represents the 'received' status of the users most recent message.
| roomName | string | | The display name of the chatroom.
| username | string | | The display name of the contact in the chatroom.
| profilePic | string | | Firebase Storage api URL for the contact's profile picture.
| isTyping | boolean | | Represents if the typing bubble should be shown.

| COLLECTION  | DESCRIPTION
| :---  | :---
| messages | A collection of documents that represent components that are displayed in the chatroom.


<br/>

### `Message`: A document that represents a Message component.
| FIELD | DATATYPE | VALUE | DESCRIPTION |
| :--- | :---   | :---  | :---        |
| obj  | string | "Message" | Signifies that this document represents a Message component.
| type  | string | ["client" \| "server"] | Signifies if the message should be displayed as a client or server message.
| text  | string |  | Text to display in the message component.
| isShowing  | boolean |  | Signifies if the message should be displayed as a client or server message.


<br/>

### `Image`: A document that represents an Image component.
| FIELD | DATATYPE | VALUE | DESCRIPTION |
| :--- | :---   | :---  | :---        |
| obj  | string | "Image" | Signifies that this document represents an Image component.
| type  | string | ["client" \| "server"] | Signifies if the message should be displayed as a client or server message.
| filename  | string |  | Name (and path) of the file as saved in Firebase Storage.
| url  | string |  | Firebase Storage api URL to display this image.
| isShowing  | boolean |  | Signifies if the message should be displayed as a client or server message.


<br/>

### `Timestamp`: A document that represents a Timestamp component.
| FIELD | DATATYPE | VALUE | DESCRIPTION |
| :--- | :---   | :---  | :---        |
| obj  | string | "Timestamp" | Signifies that this document represents a Timestamp component.
| date  | string |  | The bolded date component of the tag.s
| time  | string |  | The time component of the tag.
