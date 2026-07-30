const defaultAccounts = [
  {
    id: "keen-developer",
    name: "Keen",
    login: "keen",
    email: "keen",
    password: "keen1488",
    role: "developer",
    category: "office",
    department: "Разработка",
    status: "Активен",
    access: "Полный доступ",
  },
];

const roleLabels = {
  developer: "Разработчик",
  admin: "Администратор",
  employee: "Холодка",
  "request-rkn": "Заявка/РКН",
  closer: "Клоузер",
};

const workerRoles = ["employee", "request-rkn", "closer"];

const categoryLabels = {
  sales: "Продажи",
  production: "Производство",
  support: "Поддержка",
  office: "Офис",
  "method-1": "ПСБ",
  "method-2": "FaceID",
  "method-3": "СВО",
  "department-request": "Заявка",
  "department-closer": "Клоузер",
  "department-rkn": "РКН",
};

const statusLabels = {
  "in-progress": "В работе",
  review: "На проверке",
  done: "Готово",
};

const priorityLabels = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};

const methodLabels = {
  "method-1": "ПСБ",
  "method-2": "FaceID",
  "method-3": "СВО",
  "department-request": "Заявка",
  "department-closer": "Клоузер",
  "department-rkn": "РКН",
  custom: "Другая методика",
};

const departmentKeys = ["method-1", "method-2", "method-3", "department-request", "department-closer", "department-rkn"];
const transferFlowDepartments = ["department-request", "department-rkn"];

const storageKey = "workflow-accounts";
const sessionKey = "workflow-current-user";
const transientSessionKey = "workflow-session-user";
const rememberKey = "workflow-remember-login";
const cleanupKey = "workflow-keen-cleanup-done";
const materialsKey = "workflow-materials";
const dayReportsKey = "workflow-day-reports";
const dealsKey = "workflow-closed-deals";
const profilePhoto = "./assets/profile-default.png";

const chartData = {
  7: {
    labels: ["27 мая", "28 мая", "29 мая", "30 мая", "31 мая", "1 июня", "2 июня"],
    done: [118, 152, 114, 137, 130, 106, 168],
    success: [56, 79, 55, 68, 62, 49, 88],
  },
  14: {
    labels: ["20 мая", "21 мая", "22 мая", "23 мая", "24 мая", "25 мая", "26 мая", "27 мая", "28 мая", "29 мая", "30 мая", "31 мая", "1 июня", "2 июня"],
    done: [110, 114, 132, 174, 126, 112, 104, 118, 152, 114, 137, 130, 106, 168],
    success: [53, 52, 59, 88, 57, 50, 45, 56, 79, 55, 68, 62, 49, 88],
  },
  30: {
    labels: ["4 мая", "6 мая", "8 мая", "10 мая", "12 мая", "14 мая", "16 мая", "18 мая", "20 мая", "22 мая", "24 мая", "26 мая", "28 мая", "30 мая", "2 июня"],
    done: [96, 108, 122, 101, 146, 132, 158, 120, 110, 132, 126, 104, 152, 137, 168],
    success: [42, 48, 64, 45, 71, 66, 82, 58, 53, 59, 57, 45, 79, 68, 88],
  },
};

const authScreen = document.querySelector("#authScreen");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const rememberInput = loginForm.elements.remember;
const profileButton = document.querySelector("#profileButton");
const logoutButton = document.querySelector("#logoutButton");
const currentUserName = document.querySelector("#currentUserName");
const currentUserRole = document.querySelector("#currentUserRole");
const topProfileAvatar = document.querySelector("#topProfileAvatar");
const pageTitle = document.querySelector("#pageTitle");
const accountForm = document.querySelector("#accountForm");
const accountMessage = document.querySelector("#accountMessage");
const roleFilter = document.querySelector("#roleFilter");
const accountsTableBody = document.querySelector("#accountsTableBody");
const topEmployeeLists = document.querySelectorAll("[data-method-top]");
const departmentSummaryCards = document.querySelectorAll("[data-department-summary]");
const overallSummaryGrid = document.querySelector("#overallSummaryGrid");
const attentionList = document.querySelector("#attentionList");
const employeeHomeGrid = document.querySelector("#employeeHomeGrid");
const todayStatusBadge = document.querySelector("#todayStatusBadge");
const todayTransfers = document.querySelector("#todayTransfers");
const todayGreen = document.querySelector("#todayGreen");
const weekHomeConversion = document.querySelector("#weekHomeConversion");
const weekHomeTransfers = document.querySelector("#weekHomeTransfers");
const weekHomeGreen = document.querySelector("#weekHomeGreen");
const lastDayComment = document.querySelector("#lastDayComment");
const lastDayDate = document.querySelector("#lastDayDate");
const totalAccounts = document.querySelector("#totalAccounts");
const adminAccounts = document.querySelector("#adminAccounts");
const employeeAccounts = document.querySelector("#employeeAccounts");
const taskInProgress = document.querySelector("#taskInProgress");
const taskCompleted = document.querySelector("#taskCompleted");
const tasksTableBody = document.querySelector("#tasksTableBody");
const tasksTitle = document.querySelector("#tasksTitle");
const dayForm = document.querySelector("#dayForm");
const dayMessage = document.querySelector("#dayMessage");
const dayConversionBadge = document.querySelector("#dayConversionBadge");
const weekTotalTransfers = document.querySelector("#weekTotalTransfers");
const weekGreenTransfers = document.querySelector("#weekGreenTransfers");
const weekConversion = document.querySelector("#weekConversion");
const weeklyResultsBody = document.querySelector("#weeklyResultsBody");
const resultsTitle = document.querySelector("#resultsTitle");
const dealFormToggle = document.querySelector("#dealFormToggle");
const dealForm = document.querySelector("#dealForm");
const dealMessage = document.querySelector("#dealMessage");
const materialForm = document.querySelector("#materialForm");
const materialFormPanel = document.querySelector("#materialFormPanel");
const materialMessage = document.querySelector("#materialMessage");
const materialEmployeeSelect = document.querySelector("#materialEmployeeSelect");
const materialEmployeeFilter = document.querySelector("#materialEmployeeFilter");
const materialsTableBody = document.querySelector("#materialsTableBody");
const materialTotalCost = document.querySelector("#materialTotalCost");
const materialRows = document.querySelector("#materialRows");
const materialEmployees = document.querySelector("#materialEmployees");
const materialsTitle = document.querySelector("#materialsTitle");
const departmentEmployeesBody = document.querySelector("#departmentEmployeesBody");
const departmentTableHead = document.querySelector("#departmentTableHead");
const departmentDetailTitle = document.querySelector("#departmentDetailTitle");
const departmentDetailBadge = document.querySelector("#departmentDetailBadge");
const departmentDateFilter = document.querySelector("#departmentDateFilter");
const departmentDateClear = document.querySelector("#departmentDateClear");
const departmentDateCaption = document.querySelector("#departmentDateCaption");
const chart = document.querySelector("#resultsChart");
const select = document.querySelector("#periodSelect");
const profileAvatar = document.querySelector("#profileAvatar");
const profileName = document.querySelector("#profileName");
const profileSubtitle = document.querySelector("#profileSubtitle");
const profileLogin = document.querySelector("#profileLogin");
const profileRole = document.querySelector("#profileRole");
const profileDepartment = document.querySelector("#profileDepartment");
const profileAccess = document.querySelector("#profileAccess");
const profileStatus = document.querySelector("#profileStatus");
const profileBackButton = document.querySelector("#profileBackButton");
let activeUser = null;
let selectedDepartment = "method-1";
let selectedDepartmentDate = "";

function getAccounts() {
  if (localStorage.getItem(cleanupKey) !== "true") {
    localStorage.setItem(storageKey, JSON.stringify(defaultAccounts));
    localStorage.setItem(cleanupKey, "true");
    return [...defaultAccounts];
  }

  const stored = localStorage.getItem(storageKey);
  if (!stored) {
    localStorage.setItem(storageKey, JSON.stringify(defaultAccounts));
    return [...defaultAccounts];
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(storageKey, JSON.stringify(defaultAccounts));
    return [...defaultAccounts];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(storageKey, JSON.stringify(accounts));
}

function getMaterials() {
  const stored = localStorage.getItem(materialsKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(materialsKey);
    return [];
  }
}

function saveMaterials(materials) {
  localStorage.setItem(materialsKey, JSON.stringify(materials));
}

function getDayReports() {
  const stored = localStorage.getItem(dayReportsKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(dayReportsKey);
    return [];
  }
}

function saveDayReports(reports) {
  localStorage.setItem(dayReportsKey, JSON.stringify(reports));
}

function getDeals() {
  const stored = localStorage.getItem(dealsKey);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(dealsKey);
    return [];
  }
}

function saveDeals(deals) {
  localStorage.setItem(dealsKey, JSON.stringify(deals));
}

function getCurrentUser() {
  const remembered = localStorage.getItem(rememberKey) === "true";
  const id = remembered ? localStorage.getItem(sessionKey) : sessionStorage.getItem(transientSessionKey);
  return getAccounts().find((account) => account.id === id);
}

function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function temporaryPassword() {
  return `user${Math.floor(1000 + Math.random() * 9000)}`;
}

function accountLogin(account) {
  return account.login || account.email || "";
}

function accountPhoto() {
  return profilePhoto;
}

function formatMoney(value) {
  return `$${Number(value).toLocaleString("en-US")}`;
}

function canManage(user) {
  return user && (user.role === "developer" || user.role === "admin");
}

function isWorkerRole(role) {
  return workerRoles.includes(role);
}

function isWorker(user) {
  return user && isWorkerRole(user.role);
}

function canUseDeals(user) {
  return canManage(user) || user?.role === "closer";
}

function highestMethodExpense(materials) {
  const totals = materials.reduce((acc, item) => {
    const method = item.method || "custom";
    acc[method] = (acc[method] || 0) + Number(item.cost);
    return acc;
  }, {});
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return top ? { method: top[0], cost: top[1] } : { method: null, cost: 0 };
}

function taskTemplates(category) {
  const templates = {
    sales: ["Обработать заявки", "Подготовить КП", "Закрыть сделки недели", "Обновить CRM"],
    production: ["Подготовить материалы", "Выполнить сменный план", "Проверить качество", "Передать результат"],
    support: ["Разобрать обращения", "Закрыть SLA", "Обновить базу знаний", "Передать сложные кейсы"],
    office: ["Подготовить отчет", "Сверить документы", "Обновить регламенты", "Проверить статусы"],
    "method-1": ["Проверить заявки ПСБ", "Сверить документы ПСБ", "Закрыть рабочий пакет", "Передать отчет"],
    "method-2": ["Проверить FaceID-сессии", "Разобрать отклонения", "Обновить статусы", "Передать спорные кейсы"],
    "method-3": ["Подготовить пакет СВО", "Проверить материалы", "Закрыть этап", "Передать результат"],
    "department-request": ["Принять новую заявку", "Проверить вводные данные", "Передать заявку дальше", "Описать статус"],
    "department-closer": ["Проверить готовность сделки", "Связаться с клиентом", "Закрыть передачу", "Зафиксировать итог"],
    "department-rkn": ["Проверить запись РКН", "Сверить статус", "Передать подтвержденные", "Зафиксировать срез"],
  };
  return templates[category] || templates.office;
}

function tasksForAccount(account) {
  const base = taskTemplates(account.category);
  const seed = account.id.length + account.name.length;
  const statuses = ["in-progress", "review", "done", "done"];
  const priorities = ["high", "medium", "medium", "low"];

  return base.map((title, index) => ({
    id: `${account.id}-task-${index}`,
    title,
    employeeId: account.id,
    employeeName: account.name,
    status: statuses[(seed + index) % statuses.length],
    priority: priorities[(seed + index) % priorities.length],
    due: ["Сегодня", "Завтра", "Пятница", "Следующая неделя"][index],
    progress: [35, 60, 82, 100][(seed + index) % 4],
  }));
}

function allEmployeeAccounts() {
  return getAccounts().filter((account) => isWorkerRole(account.role));
}

function allTasks() {
  return allEmployeeAccounts().flatMap(tasksForAccount);
}

function employeeStats(account, method = "method-1", date = "") {
  const reports = getDayReports()
    .filter((report) => report.employeeId === account.id)
    .filter((report) => !date || report.date === date);
  if (reports.length) {
    const totalTransfers = reports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
    const greenTransfers = reports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
    const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
    return { conversion, greenTransfers, totalTransfers };
  }

  if (date) {
    return { conversion: 0, greenTransfers: 0, totalTransfers: 0 };
  }

  const tasks = tasksForAccount(account);
  const done = tasks.filter((task) => task.status === "done").length;
  const methodIndex = Number(method.replace("method-", "")) || 1;
  const methodShift = ((account.name.length + methodIndex * 11) % 18) - 6;
  const baseSuccess = tasks.length ? (done / tasks.length) * 100 : 0;
  const conversion = Math.max(0, Math.min(100, Math.round((baseSuccess + methodShift) * 10) / 10));
  const totalTransfers = tasks.length * (30 + methodIndex * 6) + account.name.length;
  const greenTransfers = Math.round((conversion / 100) * totalTransfers);
  return { conversion, greenTransfers, totalTransfers };
}

function setView(view) {
  if (view === "accounts" && !canManage(activeUser)) view = "dashboard";
  if (view === "tasks" && !isWorker(activeUser)) view = "dashboard";
  if (view === "expenses" && isWorker(activeUser)) view = "dashboard";
  if (view === "departments" && !canManage(activeUser)) view = "dashboard";
  if (view === "results" && !canUseDeals(activeUser)) view = "dashboard";
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.add("is-hidden"));
  document.querySelector(`#${view}View`)?.classList.remove("is-hidden");
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === view);
  });
  const titles = {
    dashboard: isWorker(activeUser) ? "Моя рабочая сводка" : "Система управления работой сотрудников",
    accounts: "Управление аккаунтами",
    departments: "Отделы",
    tasks: "Мой день",
    results: "Закрытые сделки",
    expenses: isWorker(activeUser) ? "Мои материалы" : "Расход материалов",
    profile: "Профиль",
  };
  pageTitle.textContent = titles[view] || titles.dashboard;
  if (view === "accounts") {
    renderAccounts();
  }
  if (view === "dashboard") {
    renderDashboard();
  }
  if (view === "tasks") {
    renderTasks();
  }
  if (view === "departments") {
    renderDepartments();
  }
  if (view === "results") {
    renderResults();
  }
  if (view === "expenses") {
    renderMaterials();
  }
  if (view === "profile") {
    renderProfile();
  }
}

function showApp(user) {
  activeUser = user;
  authScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  currentUserName.textContent = user.name;
  currentUserRole.textContent = roleLabels[user.role];
  topProfileAvatar.src = accountPhoto(user);
  renderRoleNavigation(user);
  setView(location.hash === "#accounts" || location.hash === "#tasks" || location.hash === "#expenses" || location.hash === "#departments" || location.hash === "#results" || location.hash === "#profile" ? location.hash.slice(1) : "dashboard");
}

function showLogin() {
  appShell.classList.add("is-hidden");
  authScreen.classList.remove("is-hidden");
}

function renderAccounts() {
  const accounts = getAccounts();
  const filter = roleFilter.value;
  const visibleAccounts = filter === "all" ? accounts : accounts.filter((account) => account.role === filter);

  totalAccounts.textContent = accounts.length;
  adminAccounts.textContent = accounts.filter((account) => account.role === "admin").length;
  employeeAccounts.textContent = accounts.filter((account) => isWorkerRole(account.role)).length;

  accountsTableBody.innerHTML = visibleAccounts
    .map(
      (account) => `
        <tr>
          <td>
            <div class="user-cell">
              <img src="${accountPhoto(account)}" alt="" />
              <div>
                <strong>${account.name}</strong>
                <small>${accountLogin(account)}</small>
              </div>
            </div>
          </td>
          <td><span class="role-badge ${account.role}">${roleLabels[account.role]}</span></td>
          <td>${categoryLabels[account.department] || account.department || categoryLabels[account.category] || "Не указано"}</td>
          <td><span class="role-badge active">${account.status}</span></td>
          <td class="access-text">${account.access}</td>
          <td>
            <button class="danger-btn" type="button" data-delete-account="${account.id}" ${account.role === "developer" ? "disabled" : ""}>
              Удалить
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderRoleNavigation(user) {
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    const view = link.dataset.viewLink;
    const restricted =
      (view === "accounts" && !canManage(user)) ||
      (view === "tasks" && !isWorker(user)) ||
      (view === "expenses" && isWorker(user)) ||
      (view === "departments" && !canManage(user)) ||
      (view === "results" && !canUseDeals(user));
    link.classList.toggle("is-hidden", restricted);
    if (view === "tasks") {
      link.querySelector("span:last-child").textContent = isWorker(user) ? "Мой день" : "Задачи";
    }
  });
  document.querySelectorAll("[data-employee-hidden]").forEach((link) => {
    link.classList.toggle("is-hidden", isWorker(user));
  });
}

function renderProfile() {
  if (!activeUser) return;
  profileAvatar.src = accountPhoto(activeUser);
  profileName.textContent = activeUser.name;
  profileSubtitle.textContent = roleLabels[activeUser.role] || activeUser.role;
  profileLogin.textContent = accountLogin(activeUser);
  profileRole.textContent = roleLabels[activeUser.role] || activeUser.role;
  profileDepartment.textContent = categoryLabels[activeUser.category] || activeUser.department || "Не указан";
  profileAccess.textContent = activeUser.access || "Личный кабинет";
  profileStatus.textContent = activeUser.status || "Активен";
}

function renderTopEmployees() {
  topEmployeeLists.forEach((list) => {
    const method = list.dataset.methodTop;
    const isTransferFlowDepartment = transferFlowDepartments.includes(method);
    list.classList.toggle("request-top-list", isTransferFlowDepartment);
    const employees = allEmployeeAccounts()
      .filter((account) => account.department === method || account.category === method)
      .map((account) => ({ account, stats: employeeStats(account, method) }))
      .sort((a, b) => b.stats.conversion - a.stats.conversion)
      .slice(0, 5);

    if (!employees.length) {
      list.innerHTML = `<li class="empty-list-message">В отделе ${methodLabels[method]} пока нет сотрудников</li>`;
      return;
    }

    list.innerHTML = employees
      .map(
        ({ account, stats }, index) => {
          const cutCount = Math.max(0, stats.totalTransfers - stats.greenTransfers);
          const statItems = isTransferFlowDepartment
            ? [
              ["Общ.", stats.totalTransfers],
              ["Передано", stats.greenTransfers],
              ["Срезано", cutCount],
              ["Конв.", `${stats.conversion}%`],
            ]
            : [
              ["Всего", stats.totalTransfers],
              ["Зел.", stats.greenTransfers],
              ["Конв.", `${stats.conversion}%`],
            ];
          return `
          <li class="compact-top-row">
            <span class="rank">${index + 1}</span>
            <span class="top-avatar">${initials(account.name)}</span>
            <div class="compact-top-content">
              <strong>${account.name}</strong>
              <div class="compact-stats">
                ${statItems.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
              </div>
            </div>
          </li>
        `;
        },
      )
      .join("");
  });
}

function departmentEmployees(method) {
  return allEmployeeAccounts().filter((account) => account.department === method || account.category === method);
}

function departmentSummary(method, date = "") {
  const employees = departmentEmployees(method);
  const stats = employees.map((account) => employeeStats(account, method, date));
  const totalTransfers = stats.reduce((sum, item) => sum + item.totalTransfers, 0);
  const greenTransfers = stats.reduce((sum, item) => sum + item.greenTransfers, 0);
  const cutTransfers = Math.max(0, totalTransfers - greenTransfers);
  const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
  return { employees, totalTransfers, greenTransfers, cutTransfers, conversion };
}

function departmentStatus(summary) {
  if (!summary.employees.length || !summary.totalTransfers) return { label: "Нет данных", tone: "medium" };
  if (summary.conversion < 45) return { label: "Просадка", tone: "high" };
  if (summary.conversion < 60) return { label: "Контроль", tone: "medium" };
  return { label: "Хорошо", tone: "active" };
}

function renderDepartmentSummaryHome() {
  const summaries = departmentKeys.map((method) => ({ method, summary: departmentSummary(method) }));

  departmentSummaryCards.forEach((card) => {
    const method = card.dataset.departmentSummary;
    const summary = departmentSummary(method);
    const isTransferFlowDepartment = transferFlowDepartments.includes(method);
    const status = departmentStatus(summary);
    const body = card.querySelector(".department-summary-body");
    const values = isTransferFlowDepartment
      ? [
        ["Сотрудников", summary.employees.length],
        ["Общ.", summary.totalTransfers],
        ["Передано", summary.greenTransfers],
        ["Срезано", summary.cutTransfers],
        ["Конверсия", `${summary.conversion}%`],
      ]
      : [
        ["Сотрудников", summary.employees.length],
        ["Всего", summary.totalTransfers],
        ["Зелёных", summary.greenTransfers],
        ["Конверсия", `${summary.conversion}%`],
      ];

    body.innerHTML = `
      <div class="department-health">
        <strong>${summary.conversion}%</strong>
        <span class="role-badge ${status.tone}">${status.label}</span>
      </div>
      <div class="department-summary-metrics ${isTransferFlowDepartment ? "wide" : ""}">
        ${values.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
      </div>
    `;
  });

  const totalTransfers = summaries.reduce((sum, item) => sum + item.summary.totalTransfers, 0);
  const greenTransfers = summaries.reduce((sum, item) => sum + item.summary.greenTransfers, 0);
  const cutTransfers = summaries.reduce((sum, item) => sum + item.summary.cutTransfers, 0);
  const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
  overallSummaryGrid.innerHTML = [
    ["Всего", totalTransfers],
    ["Успешно / передано", greenTransfers],
    ["Срезано", cutTransfers],
    ["Средняя конверсия", `${conversion}%`],
  ].map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("");

  const attentionItems = summaries
    .map(({ method, summary }) => ({ method, summary, status: departmentStatus(summary) }))
    .filter((item) => item.status.tone !== "active")
    .slice(0, 4);

  attentionList.innerHTML = attentionItems.length
    ? attentionItems.map((item) => `
      <li>
        <span class="role-badge ${item.status.tone}">${methodLabels[item.method]}</span>
        <strong>${item.status.label}</strong>
        <small>${item.summary.employees.length ? `${item.summary.conversion}% конверсия` : "нет сотрудников"}</small>
      </li>
    `).join("")
    : '<li><span class="role-badge active">OK</span><strong>Критичных просадок нет</strong><small>все отделы в норме</small></li>';
}

function departmentDateLabel() {
  return selectedDepartmentDate ? new Date(selectedDepartmentDate).toLocaleDateString("ru-RU") : "все время";
}

function renderDepartments() {
  departmentKeys.forEach((method) => {
    const employees = departmentEmployees(method);
    const stats = employees.map((account) => employeeStats(account, method, selectedDepartmentDate));
    const average = stats.length ? Math.round(stats.reduce((sum, item) => sum + item.conversion, 0) / stats.length) : 0;
    const countNode = document.querySelector(`[data-department-count="${method}"]`);
    const conversionNode = document.querySelector(`[data-department-conversion="${method}"]`);
    countNode.textContent = employees.length;
    conversionNode.textContent = `${average}%`;
  });

  document.querySelectorAll("[data-department-card]").forEach((card) => {
    card.classList.toggle("active", card.dataset.departmentCard === selectedDepartment);
  });

  const selectedEmployees = departmentEmployees(selectedDepartment)
    .map((account) => ({ account, stats: employeeStats(account, selectedDepartment, selectedDepartmentDate) }))
    .sort((a, b) => b.stats.conversion - a.stats.conversion);
  const isTransferFlowDepartment = transferFlowDepartments.includes(selectedDepartment);

  departmentDetailTitle.textContent = `Отдел ${methodLabels[selectedDepartment]}`;
  departmentDetailBadge.textContent = methodLabels[selectedDepartment];
  departmentDateCaption.textContent = selectedDepartmentDate ? `Показан день: ${departmentDateLabel()}` : "Показано: все время";
  departmentTableHead.innerHTML = isTransferFlowDepartment
    ? "<tr><th>Сотрудник</th><th>Общ. кол-во</th><th>Передано</th><th>Срезано</th><th>Конверсия</th><th>Статус</th></tr>"
    : "<tr><th>Сотрудник</th><th>Всего передач</th><th>Зелёных передач</th><th>Конверсия</th><th>Статус</th></tr>";

  if (!selectedEmployees.length) {
    departmentEmployeesBody.innerHTML = `<tr><td colspan="${isTransferFlowDepartment ? 6 : 5}" class="access-text">В отделе ${methodLabels[selectedDepartment]} пока нет сотрудников.</td></tr>`;
    return;
  }

  departmentEmployeesBody.innerHTML = selectedEmployees
    .map(
      ({ account, stats }) => {
        const cutCount = Math.max(0, stats.totalTransfers - stats.greenTransfers);
        return `
        <tr>
          <td>
            <div class="user-cell">
              <img src="${accountPhoto(account)}" alt="" />
              <div>
                <strong>${account.name}</strong>
                <small>${accountLogin(account)}</small>
              </div>
            </div>
          </td>
          <td>${stats.totalTransfers}</td>
          <td class="green-count">${stats.greenTransfers}</td>
          ${isTransferFlowDepartment ? `<td>${cutCount}</td>` : ""}
          <td class="success-text">${stats.conversion}%</td>
          <td><span class="role-badge active">${account.status}</span></td>
        </tr>
      `;
      },
    )
    .join("");
}

function reportsForLastWeek(employeeId) {
  return getDayReports()
    .filter((report) => report.employeeId === employeeId)
    .filter((report) => {
      const reportDate = new Date(report.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 6);
      weekAgo.setHours(0, 0, 0, 0);
      return reportDate >= weekAgo;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderEmployeeHome() {
  if (!isWorker(activeUser)) return;

  const reports = getDayReports()
    .filter((report) => report.employeeId === activeUser.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const today = new Date().toISOString().slice(0, 10);
  const todayReport = reports.find((report) => report.date === today);
  const weekReports = reportsForLastWeek(activeUser.id);
  const weekTransfers = weekReports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const weekGreen = weekReports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const weekConversionValue = weekTransfers ? Math.round((weekGreen / weekTransfers) * 1000) / 10 : 0;
  const latestReport = reports[0];
  const latestComment = latestReport?.planComment || latestReport?.changeComment || latestReport?.addedComment;

  todayStatusBadge.textContent = todayReport ? (todayReport.completed ? "Полный день" : "Неполный день") : "Не отмечен";
  todayStatusBadge.className = `role-badge ${todayReport?.completed ? "done" : todayReport ? "medium" : "active"}`;
  todayTransfers.textContent = `${Number(todayReport?.totalTransfers || 0).toLocaleString("ru-RU")} передач`;
  todayGreen.textContent = `${Number(todayReport?.greenTransfers || 0).toLocaleString("ru-RU")} зелёных трубок`;
  weekHomeConversion.textContent = `${weekConversionValue}%`;
  weekHomeTransfers.textContent = `${weekTransfers.toLocaleString("ru-RU")} передач`;
  weekHomeGreen.textContent = `${weekGreen.toLocaleString("ru-RU")} зелёных трубок за 7 дней`;
  lastDayComment.textContent = latestComment || "Пока нет комментариев.";
  lastDayDate.textContent = latestReport ? new Date(latestReport.date).toLocaleDateString("ru-RU") : "Заполните раздел Мой день";
}

function renderDashboard() {
  drawChart(select.value);
  const cards = document.querySelectorAll("#dashboardView .metrics-grid .metric-card");
  const metricsGrid = document.querySelector("#dashboardView .metrics-grid");
  const dashboardGrid = document.querySelector("#dashboardView .dashboard-grid");
  const homeInsightGrid = document.querySelector("#dashboardView .home-insight-grid");
  if (!cards.length || !activeUser) return;
  const employeeMode = isWorker(activeUser);

  dashboardGrid.classList.toggle("is-hidden", employeeMode);
  homeInsightGrid.classList.toggle("is-hidden", employeeMode);
  employeeHomeGrid.classList.toggle("is-hidden", !employeeMode);
  if (employeeMode) {
    renderEmployeeHome();
  } else {
    renderDepartmentSummaryHome();
  }

  cards.forEach((card) => card.classList.remove("is-hidden"));
  metricsGrid.classList.toggle("four-widgets", false);
  metricsGrid.classList.toggle("three-widgets", isWorker(activeUser) || canManage(activeUser));

  if (!isWorker(activeUser)) {
    const teamTasks = allTasks();
    const done = teamTasks.filter((task) => task.status === "done").length;
    const totalExpense = getMaterials().reduce((sum, item) => sum + Number(item.cost), 0);
    const success = teamTasks.length ? Math.round((done / teamTasks.length) * 100) : 0;
    const employees = allEmployeeAccounts().length;
    const admins = getAccounts().filter((account) => account.role === "admin").length;
    const values = {
      0: ["Сотрудников", employees, "активные рабочие аккаунты"],
      2: ["Успешность", `${success}%`, "по текущим задачам"],
      3: ["Расход", formatMoney(totalExpense), "по всем материалам"],
      4: ["Администраторов", admins, "управляют процессами"],
    };

    cards[1].classList.add("is-hidden");
    cards[4].classList.add("is-hidden");
    Object.entries(values).forEach(([index, value]) => {
      cards[index].querySelector("p").textContent = value[0];
      cards[index].querySelector("strong").textContent = value[1];
      cards[index].querySelector("small").innerHTML = `<span>${value[2]}</span>`;
    });
    return;
  }

  const userTasks = tasksForAccount(activeUser);
  const done = userTasks.filter((task) => task.status === "done").length;
  const materials = getMaterials().filter((item) => item.employeeId === activeUser.id);
  const dayReports = getDayReports().filter((report) => report.employeeId === activeUser.id);
  const dayExpense = dayReports.reduce((sum, report) => sum + Number(report.expense), 0);
  const dayTransfers = dayReports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const dayGreenTransfers = dayReports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const materialsCost = dayReports.length ? dayExpense : materials.reduce((sum, item) => sum + Number(item.cost), 0);
  const materialQty = materials.reduce((sum, item) => sum + Number(item.quantity), 0);
  const success = dayReports.length ? Math.round((dayGreenTransfers / Math.max(dayTransfers, 1)) * 100) : userTasks.length ? Math.round((done / userTasks.length) * 100) : 0;
  const values = [
    ["Дней отмечено", dayReports.length || userTasks.length, "по разделу Мой день"],
    ["Зелёных трубок", dayReports.length ? dayGreenTransfers : done, "успешные передачи"],
    ["Конверсия", `${success}%`, "по личной статистике"],
    ["Материалы", materialQty.toLocaleString("ru-RU"), "единиц использовано"],
    ["Расход", formatMoney(materialsCost), categoryLabels[activeUser.category] || "рабочая категория"],
  ];

  cards.forEach((card, index) => {
    card.querySelector("p").textContent = values[index][0];
    card.querySelector("strong").textContent = values[index][1];
    card.querySelector("small").innerHTML = `<span>${values[index][2]}</span>`;
  });
  cards[3].classList.add("is-hidden");
  cards[4].classList.add("is-hidden");
}

function renderTasks() {
  const reports = getDayReports()
    .filter((report) => report.employeeId === activeUser.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalTransfers = reports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const greenTransfers = reports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;

  tasksTitle.textContent = `Мой день: ${activeUser.name}`;
  taskInProgress.textContent = reports.filter((report) => report.completed).length;
  taskCompleted.textContent = greenTransfers.toLocaleString("ru-RU");
  dayConversionBadge.textContent = `${conversion}%`;

  if (!dayForm.elements.date.value) {
    dayForm.elements.date.value = new Date().toISOString().slice(0, 10);
  }

  if (!reports.length) {
    tasksTableBody.innerHTML = '<tr><td colspan="6" class="access-text">Пока нет сохранённых отчётов дня.</td></tr>';
    return;
  }

  tasksTableBody.innerHTML = reports
    .map((report) => {
      const reportConversion = report.totalTransfers ? Math.round((Number(report.greenTransfers) / Number(report.totalTransfers)) * 1000) / 10 : 0;
      return `
        <tr>
          <td>${new Date(report.date).toLocaleDateString("ru-RU")}</td>
          <td><span class="role-badge ${report.completed ? "done" : "medium"}">${report.completed ? "Полный" : "Неполный"}</span></td>
          <td>${Number(report.totalTransfers).toLocaleString("ru-RU")}</td>
          <td class="green-count">${Number(report.greenTransfers).toLocaleString("ru-RU")}</td>
          <td class="success-text">${reportConversion}%</td>
          <td>${report.planComment}</td>
        </tr>
      `;
    })
    .join("");
}

function renderResults() {
  const deals = getDeals()
    .filter((deal) => activeUser?.role !== "closer" || deal.closerId === activeUser.id || deal.closerName === activeUser.name)
    .sort((a, b) => b.createdAt - a.createdAt);
  const totalAmount = deals.reduce((sum, deal) => sum + Number(deal.amount), 0);

  resultsTitle.textContent = activeUser?.role === "closer" ? `Закрытые сделки: ${activeUser.name}` : "Закрытые сделки";
  weekTotalTransfers.textContent = deals.length;
  weekGreenTransfers.textContent = formatMoney(totalAmount);
  weekConversion.textContent = deals.filter((deal) => deal.status === "Закрыт").length;

  if (activeUser?.role === "closer" && !dealForm.elements.closerName.value) {
    dealForm.elements.closerName.value = activeUser.name;
  }

  if (!deals.length) {
    weeklyResultsBody.innerHTML = '<tr><td colspan="4" class="access-text">Закрытых сделок пока нет.</td></tr>';
    return;
  }

  weeklyResultsBody.innerHTML = deals
    .map(
      (deal) => `
        <tr>
          <td>${deal.clientName}</td>
          <td>${deal.closerName}</td>
          <td>${formatMoney(deal.amount)}</td>
          <td><span class="role-badge done">${deal.status}</span></td>
        </tr>
      `,
    )
    .join("");
}

function employeeOptions(includeAll = false) {
  const employees = allEmployeeAccounts();
  const options = employees.map((employee) => `<option value="${employee.id}">${employee.name}</option>`).join("");
  return `${includeAll ? '<option value="all">Все сотрудники</option>' : ""}${options || '<option value="">Нет сотрудников</option>'}`;
}

function getVisibleMaterials() {
  const materials = getMaterials();
  if (isWorker(activeUser)) {
    return materials.filter((item) => item.employeeId === activeUser.id);
  }
  if (materialEmployeeFilter.value && materialEmployeeFilter.value !== "all") {
    return materials.filter((item) => item.employeeId === materialEmployeeFilter.value);
  }
  return materials;
}

function renderMaterials() {
  const employees = allEmployeeAccounts();
  const selectedFilter = materialEmployeeFilter.value || "all";
  const materials = getVisibleMaterials();
  const total = materials.reduce((sum, item) => sum + Number(item.cost), 0);
  const uniqueEmployees = new Set(materials.map((item) => item.employeeId));

  materialFormPanel.classList.toggle("muted-panel", !canManage(activeUser));
  materialEmployeeSelect.innerHTML = employeeOptions(false);
  materialEmployeeFilter.innerHTML = employeeOptions(true);
  if ([...materialEmployeeFilter.options].some((option) => option.value === selectedFilter)) {
    materialEmployeeFilter.value = selectedFilter;
  }
  materialEmployeeFilter.disabled = isWorker(activeUser);
  materialsTitle.textContent = isWorker(activeUser) ? `Мои материалы: ${activeUser.name}` : "Расход материалов";

  materialTotalCost.textContent = formatMoney(total);
  materialRows.textContent = materials.length;
  materialEmployees.textContent = uniqueEmployees.size;

  materialsTableBody.innerHTML = materials
    .map((item) => {
      const employee = employees.find((account) => account.id === item.employeeId);
      return `
        <tr>
          <td>${item.material}</td>
          <td>${methodLabels[item.method] || "Методика не указана"}</td>
          <td>${item.quantity} ${item.unit}</td>
          <td>${employee?.name || "Неизвестно"}</td>
          <td>${item.date}</td>
          <td>${formatMoney(item.cost)}</td>
        </tr>
      `;
    })
    .join("");

  if (!materials.length) {
    materialsTableBody.innerHTML = '<tr><td colspan="6" class="access-text">Пока нет записей по материалам.</td></tr>';
  }
}

function pointList(values, width, height, padding, maxValue) {
  const step = (width - padding.left - padding.right) / (values.length - 1);
  return values.map((value, index) => {
    const x = padding.left + index * step;
    const y = height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
    return { x, y, value };
  });
}

function drawChart(period = "14") {
  if (!chart) return;

  const data = chartData[period];
  const width = 900;
  const height = 300;
  const padding = { top: 18, right: 18, bottom: 48, left: 48 };
  const maxValue = 210;
  const donePoints = pointList(data.done, width, height, padding, maxValue);
  const successPoints = pointList(data.success, width, height, padding, maxValue);
  const path = (points) => points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const area = (points) => `${path(points)} L${points.at(-1).x},${height - padding.bottom} L${points[0].x},${height - padding.bottom} Z`;
  const gridValues = [0, 50, 100, 150, 200];

  chart.innerHTML = `
    <defs>
      <linearGradient id="blueArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#2f78ff" stop-opacity=".16" />
        <stop offset="1" stop-color="#2f78ff" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="greenArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#21b573" stop-opacity=".16" />
        <stop offset="1" stop-color="#21b573" stop-opacity="0" />
      </linearGradient>
    </defs>
    ${gridValues
      .map((value) => {
        const y = height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
        return `<g>
          <line x1="${padding.left}" x2="${width - padding.right}" y1="${y}" y2="${y}" stroke="#dfe7f1" />
          <text x="${padding.left - 16}" y="${y + 5}" text-anchor="end" fill="#72819c" font-size="13" font-weight="700">${value}</text>
        </g>`;
      })
      .join("")}
    <path d="${area(donePoints)}" fill="url(#blueArea)" />
    <path d="${area(successPoints)}" fill="url(#greenArea)" />
    <path d="${path(donePoints)}" fill="none" stroke="#2f78ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="${path(successPoints)}" fill="none" stroke="#21b573" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    ${donePoints.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#2f78ff" stroke="#fff" stroke-width="2" />`).join("")}
    ${successPoints.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#21b573" stroke="#fff" stroke-width="2" />`).join("")}
    ${data.labels
      .map((label, index) => `<text x="${donePoints[index].x}" y="${height - 18}" text-anchor="middle" fill="#667895" font-size="13" font-weight="700">${label}</text>`)
      .join("")}
  `;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const login = String(formData.get("login")).trim().toLowerCase();
  const password = String(formData.get("password"));
  const user = getAccounts().find((account) => accountLogin(account).toLowerCase() === login && account.password === password);

  if (!user) {
    showMessage(loginMessage, "Неверный login или password.", true);
    return;
  }

  if (rememberInput.checked) {
    localStorage.setItem(sessionKey, user.id);
    localStorage.setItem(rememberKey, "true");
    sessionStorage.removeItem(transientSessionKey);
  } else {
    sessionStorage.setItem(transientSessionKey, user.id);
    localStorage.removeItem(sessionKey);
    localStorage.removeItem(rememberKey);
  }
  showMessage(loginMessage, "");
  loginForm.reset();
  showApp(user);
});

profileButton.addEventListener("click", () => {
  history.replaceState(null, "", "#profile");
  setView("profile");
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(rememberKey);
  sessionStorage.removeItem(transientSessionKey);
  activeUser = null;
  history.replaceState(null, "", "#login");
  showLogin();
});

profileBackButton.addEventListener("click", () => {
  history.replaceState(null, "", "#dashboard");
  setView("dashboard");
});

document.querySelectorAll("[data-view-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const view = link.dataset.viewLink;
    if (link.dataset.departmentOpen) {
      selectedDepartment = link.dataset.departmentOpen;
    }
    history.replaceState(null, "", `#${view}`);
    setView(view);
  });
});

accountsTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-account]");
  if (!button || button.disabled) return;

  const accountId = button.dataset.deleteAccount;
  const accounts = getAccounts();
  const account = accounts.find((item) => item.id === accountId);
  if (!account || account.role === "developer") return;

  saveAccounts(accounts.filter((item) => item.id !== accountId));
  saveMaterials(getMaterials().filter((item) => item.employeeId !== accountId));
  saveDayReports(getDayReports().filter((report) => report.employeeId !== accountId));
  renderAccounts();
  renderDashboard();
  renderDepartments();
  renderMaterials();
  showMessage(accountMessage, `Аккаунт ${account.name} удален.`);
});

document.querySelectorAll("[data-department-card]").forEach((card) => {
  card.addEventListener("click", () => {
    selectedDepartment = card.dataset.departmentCard;
    renderDepartments();
  });
});

departmentDateFilter.addEventListener("change", () => {
  selectedDepartmentDate = departmentDateFilter.value;
  renderDepartments();
});

departmentDateClear.addEventListener("click", () => {
  selectedDepartmentDate = "";
  departmentDateFilter.value = "";
  renderDepartments();
});

dealFormToggle.addEventListener("click", () => {
  dealForm.classList.toggle("is-hidden");
  if (activeUser?.role === "closer") {
    dealForm.elements.closerName.value = activeUser.name;
  }
});

dealForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canUseDeals(activeUser)) return;

  const formData = new FormData(dealForm);
  const deal = {
    id: `deal-${Date.now()}`,
    clientName: String(formData.get("clientName")).trim(),
    closerName: String(formData.get("closerName")).trim(),
    closerId: activeUser?.role === "closer" ? activeUser.id : "",
    amount: Number(formData.get("amount")),
    status: "Закрыт",
    createdAt: Date.now(),
  };

  const deals = getDeals();
  deals.push(deal);
  saveDeals(deals);
  dealForm.reset();
  if (activeUser?.role === "closer") {
    dealForm.elements.closerName.value = activeUser.name;
  }
  renderResults();
  showMessage(dealMessage, "Сделка добавлена.");
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const accounts = getAccounts();
  const formData = new FormData(accountForm);
  const login = String(formData.get("login")).trim().toLowerCase();

  if (accounts.some((account) => accountLogin(account).toLowerCase() === login)) {
    showMessage(accountMessage, "Такой login уже используется.", true);
    return;
  }

  const role = String(formData.get("role"));
  const password = String(formData.get("password")).trim();
  const account = {
    id: `${role}-${Date.now()}`,
    name: String(formData.get("name")).trim(),
    login,
    email: login,
    password,
    role,
    category: String(formData.get("department")),
    department: String(formData.get("department")),
    status: "Активен",
    access: role === "admin" ? "Команда и отчеты" : "Личный кабинет",
  };

  accounts.push(account);
  saveAccounts(accounts);
  accountForm.reset();
  renderAccounts();
  renderDashboard();
  renderDepartments();
  renderMaterials();
  showMessage(accountMessage, `Аккаунт создан. Login: ${login}, Password: ${password}`);
});

dayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isWorker(activeUser)) return;

  const formData = new FormData(dayForm);
  const totalTransfersValue = Number(formData.get("totalTransfers"));
  const greenTransfersValue = Number(formData.get("greenTransfers"));

  if (greenTransfersValue > totalTransfersValue) {
    showMessage(dayMessage, "Зелёных трубок не может быть больше общего количества передач.", true);
    return;
  }

  const reports = getDayReports();
  const report = {
    id: `day-${Date.now()}`,
    employeeId: activeUser.id,
    date: String(formData.get("date")),
    completed: formData.get("completed") === "on",
    expense: 0,
    totalTransfers: totalTransfersValue,
    greenTransfers: greenTransfersValue,
    planComment: String(formData.get("planComment")).trim(),
    changeComment: String(formData.get("changeComment")).trim(),
    addedComment: String(formData.get("addedComment")).trim(),
  };

  const nextReports = reports.filter((item) => !(item.employeeId === activeUser.id && item.date === report.date));
  nextReports.push(report);
  saveDayReports(nextReports);
  renderTasks();
  renderDashboard();
  renderDepartments();
  renderResults();
  showMessage(dayMessage, "День сохранён.");
});

materialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage(activeUser)) return;

  const formData = new FormData(materialForm);
  const employeeId = String(formData.get("employeeId"));
  if (!employeeId) {
    showMessage(materialMessage, "Сначала создайте аккаунт сотрудника.", true);
    return;
  }

  const materials = getMaterials();
  materials.push({
    id: `material-${Date.now()}`,
    material: String(formData.get("material")).trim(),
    method: String(formData.get("method")),
    quantity: Number(formData.get("quantity")),
    unit: String(formData.get("unit")),
    employeeId,
    cost: Number(formData.get("cost")),
    date: new Date().toLocaleDateString("ru-RU"),
  });

  saveMaterials(materials);
  materialForm.reset();
  renderMaterials();
  renderDashboard();
  showMessage(materialMessage, "Расход материала сохранен.");
});

roleFilter.addEventListener("change", renderAccounts);
select.addEventListener("change", (event) => drawChart(event.target.value));
materialEmployeeFilter.addEventListener("change", renderMaterials);

const currentUser = getCurrentUser();
if (currentUser) {
  showApp(currentUser);
} else {
  showLogin();
}
