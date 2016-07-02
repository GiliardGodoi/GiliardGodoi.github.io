<%-- 
    Document   : listar-usuarios
    Created on : 15/05/2016, 15:30:44
    Author     : giliard
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Usuários</title>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 5px;
                
            }
        </style>
    </head>
    <body>
        <h1>Listar Usuários cadastrados</h1>
        
        <c:if test="${not empty clientes}">
            <table>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Login</th>
                    <th>remover</th>
                </tr>
                <c:forEach var="cliente" items="${clientes}" varStatus="num">
                    <tr bgcolor="#${num.count % 2 == 0 ? 'eee' : 'fff' }">
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.login}</td>
                        <td>
                            <a href="./controller?logica=RemoverUsuario&deletecliente=${cliente.idCliente}">Remover Cliente</a>
                        </td>
                    </tr>                
                </c:forEach>
            </table>
        </c:if>
        <a href="index.html">voltar</a>
    </body>
</html>
