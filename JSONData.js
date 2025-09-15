export const people = [
  { id: "p1", name: "Arun", email: "arun@example.com", capacityHrsPerDay: 6 },
  { id: "p2", name: "Uma", email: "uma@", capacityHrsPerDay: 5 }, // invalid email
  {
    id: "p3",
    name: "Aadhir",
    email: "aadhir@example.com",
    capacityHrsPerDay: 4,
  },
  { id: "p4", name: "Aarik", email: "aarik@example.com", capacityHrsPerDay: 0 }, // edge: zero capacity
];
export const todos = [
  // id, title, estimateHrs, priority, status, due(YYYY-MM-DD), assigneeId?, dependsOn?
  {
    id: "t1",
    title: "Setup repo",
    estimateHrs: 2,
    priority: "high",
    status: "done",
    due: "2025-09-16",
    assigneeId: "p1",
  },
  {
    id: "t2",
    title: "Scaffold UI",
    estimateHrs: 5,
    priority: "high",
    status: "in-progress",
    due: "2025-09-18",
    assigneeId: "p1",
    dependsOn: ["t1"],
  },
  {
    id: "t3",
    title: "Build login",
    estimateHrs: 8,
    priority: "medium",
    status: "todo",
    due: "2025-09-20",
    assigneeId: "p2",
  },
  {
    id: "t4",
    title: "Payments integration",
    estimateHrs: 13,
    priority: "high",
    status: "todo",
    due: "2025-09-19",
    assigneeId: "p2",
    dependsOn: ["t3"],
  },
  {
    id: "t5",
    title: "Notifications",
    estimateHrs: 3,
    priority: "low",
    status: "todo",
    due: "2025-09-25",
    assigneeId: null,
  }, // unassigned
  {
    id: "t6",
    title: "Profile screen",
    estimateHrs: 5,
    priority: "medium",
    status: "in-progress",
    due: "2025-09-21",
    assigneeId: "p3",
  },
  {
    id: "t7",
    title: "Accessibility pass",
    estimateHrs: 2,
    priority: "medium",
    status: "todo",
    due: "2025-09-15",
    assigneeId: "p3",
  }, // overdue (today is 2025-09-15 IST)
  {
    id: "t8",
    title: "Error monitoring",
    estimateHrs: 4,
    priority: "low",
    status: "todo",
    due: "2025-09-23",
    assigneeId: "p4",
  }, // zero-capacity assignee
  {
    id: "t9",
    title: "Build login",
    estimateHrs: 8,
    priority: "medium",
    status: "todo",
    due: "2025-09-20",
    assigneeId: "p2",
  }, // duplicate title
  {
    id: "t10",
    title: "Refactor utils",
    estimateHrs: 3,
    priority: "low",
    status: "done",
    due: "2025-09-14",
    assigneeId: "p1",
  }, // done but due in past
  {
    id: "t11",
    title: "Release v1",
    estimateHrs: 6,
    priority: "high",
    status: "blocked",
    due: "2025-09-22",
    assigneeId: "p2",
    dependsOn: ["t4", "t6"],
  },
  {
    id: "t12",
    title: "Data migration",
    estimateHrs: 7,
    priority: "high",
    status: "todo",
    due: "2025-09-28",
    assigneeId: "p3",
    dependsOn: ["t4", "t15"],
  }, // missing dep t99
  {
    id: "t13",
    // title: "Cycle check A",
    title: "Data Migration",
    estimateHrs: 1,
    priority: "low",
    status: "todo",
    due: "2025-09-30",
    assigneeId: "p3",
    dependsOn: ["t14"],
  },
  {
    id: "t14",
    title: "Cycle check B",
    estimateHrs: 1,
    priority: "low",
    status: "todo",
    due: "2025-09-30",
    assigneeId: "p3",
    dependsOn: ["t13"],
  },
];

export const normalizeTodosWithoutDuplicate = function (todos) {
  return todos?.reduce((normalizedTodos, todo) => {
    let todoTitle = todo?.title;
    let todoId = todo?.id;
    let estimatedHours = todo?.estimateHrs;
    let priority = todo?.priority;
    let todoStatus = todo?.status;
    let todoDue = todo?.due;
    let assignedId = todo?.assigneeId;
    let todoDependsOn = todo?.dependsOn;

    //Check Condition
    if (
      typeof todoTitle !== "string" ||
      typeof todoId !== "string" ||
      typeof estimatedHours !== "number" ||
      estimatedHours <= 0 ||
      typeof priority !== "string" ||
      typeof todoStatus !== "string" ||
      typeof todoDue !== "string" ||
      (assignedId !== null && typeof assignedId !== "string") ||
      typeof todoDue !== "string" ||
      (todoDependsOn && !Array.isArray(todoDependsOn))
    ) {
      console.error("Invalid Input..");
      return normalizedTodos;
    }

    todoTitle = todoTitle.trim().toLowerCase();
    todoId = todoId.trim().toLowerCase();
    priority = priority.trim().toLowerCase();
    todoStatus = todoStatus.trim().toLowerCase();
    todoDue = todoDue.trim().toLowerCase();
    assignedId = assignedId?.trim().toLowerCase();
    if (normalizedTodos[todoTitle]) {
      return normalizedTodos;
    }
    normalizedTodos[todoTitle] = {
      todoId,
      estimatedHours,
      priority,
      todoStatus,
      todoDue,
      assignedId,
      todoDependsOn,
    };
    return normalizedTodos;
  }, {});
};

export const normalizeTodos = function (todos) {
  return todos?.reduce((normalizedTodos, todo) => {
    let todoTitle = todo?.title;
    let todoId = todo?.id;
    let estimatedHours = todo?.estimateHrs;
    let priority = todo?.priority;
    let todoStatus = todo?.status;
    let todoDue = todo?.due;
    let assignedId = todo?.assigneeId;
    let todoDependsOn = todo?.dependsOn;

    //Check Condition
    if (
      typeof todoTitle !== "string" ||
      typeof todoId !== "string" ||
      typeof estimatedHours !== "number" ||
      estimatedHours <= 0 ||
      typeof priority !== "string" ||
      typeof todoStatus !== "string" ||
      typeof todoDue !== "string" ||
      (assignedId !== null && typeof assignedId !== "string") ||
      typeof todoDue !== "string" ||
      (todoDependsOn && !Array.isArray(todoDependsOn))
    ) {
      console.error("Invalid Input..");
      return normalizedTodos;
    }

    todoTitle = todoTitle.trim().toLowerCase();
    todoId = todoId.trim().toLowerCase();
    priority = priority.trim().toLowerCase();
    todoStatus = todoStatus.trim().toLowerCase();
    todoDue = todoDue.trim().toLowerCase();
    assignedId = assignedId?.trim().toLowerCase();
    if (normalizedTodos[todoTitle]) {
      return normalizedTodos;
    }
    normalizedTodos.push({
      todoTitle,
      todoId,
      estimatedHours,
      priority,
      todoStatus,
      todoDue,
      assignedId,
      todoDependsOn,
    });
    return normalizedTodos;
  }, []);
};

export const normalizePeoples = function (peoples) {
  return peoples?.reduce((normalizedPeoples, user) => {
    let userId = user?.id;
    let userName = user?.name;
    let userEmail = user?.email;
    let userCapacityHoursPerDay = user?.capacityHrsPerDay;

    if (
      typeof userId !== "string" ||
      typeof userName !== "string" ||
      typeof userEmail !== "string" ||
      typeof userCapacityHoursPerDay !== "number"
    ) {
      return normalizedPeoples;
    }

    userId = userId.trim().toLowerCase();
    // userName = userName.trim().toLowerCase();
    userEmail = userEmail.trim().toLowerCase();

    normalizedPeoples.push({
      userId,
      userName,
      userEmail,
      userCapacityHoursPerDay,
    });
    return normalizedPeoples;
  }, []);
};

export const mapIdWithUserDetails = function (peoples) {
  return peoples?.reduce((idToUserMap, user) => {
    const userId = user?.userId;
    
    idToUserMap[userId] = user;
    return idToUserMap;
  }, {});
};
