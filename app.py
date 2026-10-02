from flask import Flask, request,jsonify,send_from_directory

from database import tasks_collection

app = Flask(__name__)


@app.route("/")
def home():
    return send_from_directory('frontend', 'index.html')
@app.route("/<path:path>")
def frontend_files(path):
    return send_from_directory('frontend', path)


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = list(tasks_collection.find({}))

    for task in tasks:
        task["_id"] = str(task["_id"])

    return jsonify(tasks)


# POST - नया task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()

    task = {
        "title": data["title"],
        "description": data.get("description", ""),
        "status": data.get("status", "Pending")
    }

    result = tasks_collection.insert_one(task)
    task["_id"] = str(result.inserted_id)
    return jsonify({
        "message": "Task added successfully!",
        "task": task
    }), 201


# PUT - task update
@app.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    from bson.objectid import ObjectId

    data = request.get_json()

    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "title": data.get("title"),
                "description": data.get("description"),
                "status": data.get("status")
            }
        }
    )

    if result.matched_count == 0:
        return jsonify({"message": "Task not found!"}), 404

    return jsonify({
        "message": "Task updated successfully!"
    })


# DELETE - task delete
@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    from bson.objectid import ObjectId

    result = tasks_collection.delete_one(
        {"_id": ObjectId(task_id)}
    )

    if result.deleted_count == 0:
        return jsonify({"message": "Task not found!"}), 404

    return jsonify({
        "message": "Task deleted successfully!"
    })


if __name__ == "__main__":
    app.run(debug=True)