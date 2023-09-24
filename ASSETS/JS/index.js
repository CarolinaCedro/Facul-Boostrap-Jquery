$(document).ready(function () {
    // Intercepta o evento de 'submit' do formulário
    $("#comment-form").submit(function (event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Captura o texto inserido no textarea
        var commentText = $("#comment-text").val();

        if (commentText.trim() !== "") {
            // Cria um novo elemento para o comentário com um timestamp
            var timestamp = new Date().getTime();
            var commentElement = $("<div class='alert alert-info mt-2' role='alert' data-timestamp='" + timestamp + "'>" +
                commentText +
                "<span class='float-end'>" +
                "<span class='like-count'>0</span>" +
                "<button class='btn btn-primary btn-sm like-btn'><i class='bi bi-heart'></i> Like</button> " +
                "<button class='btn btn-danger btn-sm delete-btn' data-bs-toggle='modal' data-bs-target='#deleteModal'>Delete</button>" +
                "</span></div>");

            // Anexa o elemento à div de comentários
            $("#comment-list").append(commentElement);

            // Limpa o textarea
            $("#comment-text").val("");
        }
    });

    // Adiciona funcionalidade de "like" aos comentários
    $("#comment-list").on("click", ".like-btn", function () {
        var comment = $(this).closest(".alert");
        var likes = comment.data("likes") || 0;
        likes++;
        comment.data("likes", likes);
        comment.find(".like-count").text(likes);
    });

    // Excluir comentário com modal
    var commentToDelete;
    $("#comment-list").on("click", ".delete-btn", function () {
        commentToDelete = $(this).closest(".alert");
    });

    $("#confirm-delete").click(function () {
        if (commentToDelete) {
            commentToDelete.remove();
            $('#deleteModal').modal('hide');
        }
    });

    // Ordenar comentários por mais recentes ou mais antigos
    // Ordenar comentários por mais recentes ou mais antigos
    $("#sort-select").change(function () {
        var selectedValue = $(this).val();
        var comments = $("#comment-list .alert");

        if (selectedValue === "recentes") {
            comments.sort(function (a, b) {
                var timeA = $(a).data("timestamp");
                var timeB = $(b).data("timestamp");
                return timeB - timeA;
            });
        } else if (selectedValue === "antigos") {
            comments.sort(function (a, b) {
                var timeA = $(a).data("timestamp");
                var timeB = $(b).data("timestamp");
                return timeA - timeB;
            });
        }

        $("#comment-list").html(comments);
    });


});

