/* global Office */

(function () {
  "use strict";

  var elements = {};

  function cacheElements() {
    elements.statusBadge = document.getElementById("office-status");
    elements.btnStartReview = document.getElementById("btn-start-review");
    elements.actionMessage = document.getElementById("action-message");
    elements.resultCount = document.getElementById("result-count");
    elements.resultsEmpty = document.getElementById("results-empty");
    elements.resultsList = document.getElementById("results-list");
  }

  function setStatus(text, state) {
    if (!elements.statusBadge) return;
    elements.statusBadge.textContent = text;
    elements.statusBadge.className = "status-badge status-badge--" + state;
  }

  function setActionMessage(text) {
    if (elements.actionMessage) {
      elements.actionMessage.textContent = text || "";
    }
  }

  function onOfficeReady() {
    setStatus("已连接 Word", "ready");
    if (elements.btnStartReview) {
      elements.btnStartReview.disabled = false;
    }
    setActionMessage("基础框架已就绪。下一步将接入文档读取与 Dify API。");
  }

  function onStartReviewClick() {
    setActionMessage("「开始审查」功能将在后续步骤实现（读取文档 → 调用 Dify → 展示卡片）。");
  }

  function bindEvents() {
    if (elements.btnStartReview) {
      elements.btnStartReview.addEventListener("click", onStartReviewClick);
    }
  }

  function init() {
    cacheElements();
    bindEvents();

    Office.onReady(function (info) {
      if (info.host === Office.HostType.Word) {
        onOfficeReady();
      } else {
        setStatus("请在 Word 中打开", "error");
        setActionMessage("此加载项仅支持 Microsoft Word。");
      }
    }).catch(function () {
      setStatus("Office 初始化失败", "error");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
