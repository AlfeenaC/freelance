import React from 'react';

function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tasks</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {/* Sample tasks - replace with your actual tasks data */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">Sample Task 1</h3>
              <p className="text-gray-600">This is a description of task 1</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold">Sample Task 2</h3>
              <p className="text-gray-600">This is a description of task 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
