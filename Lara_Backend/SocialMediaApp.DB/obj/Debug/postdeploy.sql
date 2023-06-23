/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
    /*
BEGIN

INSERT INTO [dbo].[User] (UserId,FirstName,LastName,Email)
VALUES (newid(),'Dzeko','Dzekic','dzeko@gmail.com')

INSERT INTO [dbo].[User] (UserId,FirstName,LastName,Email)
VALUES (newid(),'Kemo','Dzekic','KemoDz@gmail.com')

END
*/
GO
