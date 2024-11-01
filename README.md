# adaptivescale-com
- Official AdaptiveScale website

## Installation and Start on macOS

1. **Install Hugo using Homebrew**:
   ```
   brew install hugo
   ```

2. **Verify Installation**:

    ```
    hugo version
    ```

3. **Start Hugo Server**:

    ```
    hugo server
    ```

## Installation and Start on Ubuntu

1. **Install Hugo using APT**:

    ```
    sudo apt install hugo
    ```

2. **Verify Installation**:

    ```
    hugo version
    ```

3. **Start Hugo Server**:

    ```
    hugo server
    ```

### **Troubleshooting**: If you encounter any issues, refer to the [Hugo documentation](https://gohugo.io/installation/).

___

# Working with Static Files and Blogs

- **Website Changes**: To make changes to the website, work with the static files in the `static` directory.

- **Blogs**: To add or remove blog posts, modify the content in the `content` folder.


___



# Adding a Notification Bar

### To add a notification bar to your website, follow these steps:

#### 1. Insert the following HTML code below the `ud-header` class (inside the header section) of webpage:

```
<div class="notification-bar" id="notification-bar">
  <p><a href="#linktozoho">Join us</a> for an exclusive RosettaDB webinar with XXXX! Discover powerful database solutions and boost your data management skills.</p>
  <button class="close-button" onclick="closeNotification()">X</button>
</div>

```
#### 2. Add the following JavaScript code to the end of HTML file:

```
<script>
  function closeNotification() {
    // Hide the notification bar
    document.getElementById('notification-bar').style.display = 'none';
    // Save the closed state in localStorage
    localStorage.setItem('notificationClosed', 'true');
  }
</script>
```
#### 3. Include the following code in main.js file:

```
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('notificationClosed') !== 'true') {
    document.getElementById('notification-bar').style.display = 'flex';
  }
});

```
#### 4. Ensure that the following CSS is included in styles.css:

```
.notification-bar {
  background-color: #BED4FF;
  color: var(--primary-color);
  padding: 5px 15px;
  top: 0;
  width: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.notification-bar p {
  margin: 0;
  font-size: 16px;
  flex-grow: 1;
  text-align: center;
}

.close-button {
  color: #2a3a4d;
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 15px;
  right: 15px;
}
```
Ensure that all parts are correctly implemented to achieve the desired effect of displaying and managing the notification bar effectively.
