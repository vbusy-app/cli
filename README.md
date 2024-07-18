<div align="center">
  <img src="https://i.imgur.com/AVqWl72.png" alt="bee" width="80"  style="margin-bottom: 15px;">
  <h1 align="center">vbusy cli</h1>
  <p>a command-line interface for <a href="https://github.com/enna-ai/vbusy">vbusy</a></p>
</div>

&nbsp;

## At a glance

<table>
  <tr>
    <td>
      <figure>
        <img src="https://i.imgur.com/F98jobu.png" alt="login screen">
        <figcaption>Logging in to Vbusy</figcaption>
      </figure>
    </td>
    <td>
      <figure>
        <img src="https://i.imgur.com/q2RngO0.png" alt="task creation">
        <figcaption>Task Creation</figcaption>
      </figure>
    </td>
  </tr>
  <tr>
      <td>
        <figure>
          <img src="https://i.imgur.com/eVt9XUL.png" alt="viewing all tasks">
          <figcaption>Task List</figcaption>
        </figure>
      </td>
      <td>
        <figure>
          <img src="https://i.imgur.com/rzNUxwv.png" alt="deleting a task">
        <figcaption>Delete a Task</figcaption>
      </figure>
    </td>
  </tr>
</table>


## Commands

```sh

add       create a new task       -t: task | -p: priority
delete    delete an existing task
list      view all of your tasks

```

#### example
```sh

$ vb add --task="new task" --priority="low"

```

## To Do
- [ ] purge
- [ ] archive & unarchive
- [ ] complete
- [ ] export
- [ ] view single task
- [ ] edit