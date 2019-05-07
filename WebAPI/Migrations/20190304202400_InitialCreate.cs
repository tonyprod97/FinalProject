using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<float>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Logs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 1, "Ferko", "Feric", new byte[] { 55, 85, 245, 121, 163, 90, 53, 122, 45, 25, 230, 91, 10, 251, 6, 8, 247, 137, 62, 161, 60, 126, 125, 186, 125, 241, 96, 136, 231, 240, 28, 73, 203, 255, 60, 190, 12, 115, 138, 7, 127, 39, 42, 244, 93, 91, 205, 94, 219, 144, 5, 15, 12, 85, 52, 67, 88, 244, 119, 114, 68, 44, 75, 87 }, new byte[] { 149, 212, 200, 18, 63, 130, 252, 41, 212, 167, 214, 107, 235, 251, 159, 101, 55, 104, 196, 113, 7, 90, 218, 109, 70, 213, 200, 65, 107, 99, 120, 163, 2, 216, 75, 193, 166, 147, 89, 48, 99, 22, 235, 212, 177, 5, 58, 235, 48, 80, 56, 253, 149, 163, 110, 100, 73, 31, 40, 107, 49, 115, 197, 182, 73, 152, 142, 89, 244, 232, 89, 54, 219, 242, 184, 157, 26, 51, 56, 84, 229, 167, 254, 108, 84, 187, 29, 45, 56, 223, 75, 184, 202, 134, 39, 218, 96, 114, 50, 210, 70, 72, 16, 166, 122, 192, 118, 226, 199, 174, 215, 232, 136, 245, 3, 6, 134, 176, 85, 133, 90, 22, 33, 40, 93, 190, 36, 66 }, "testUser" });

            migrationBuilder.InsertData(
                table: "Logs",
                columns: new[] { "Id", "Date", "UserId", "Value" },
                values: new object[,]
                {
                    { 1, new DateTime(2019, 3, 4, 21, 24, 0, 290, DateTimeKind.Local), 1, 70f },
                    { 73, new DateTime(2018, 12, 22, 21, 24, 0, 293, DateTimeKind.Local), 1, 82f },
                    { 72, new DateTime(2018, 12, 23, 21, 24, 0, 293, DateTimeKind.Local), 1, 81f },
                    { 71, new DateTime(2018, 12, 24, 21, 24, 0, 293, DateTimeKind.Local), 1, 80f },
                    { 70, new DateTime(2018, 12, 25, 21, 24, 0, 293, DateTimeKind.Local), 1, 79f },
                    { 69, new DateTime(2018, 12, 26, 21, 24, 0, 293, DateTimeKind.Local), 1, 78f },
                    { 68, new DateTime(2018, 12, 27, 21, 24, 0, 293, DateTimeKind.Local), 1, 77f },
                    { 67, new DateTime(2018, 12, 28, 21, 24, 0, 293, DateTimeKind.Local), 1, 76f },
                    { 66, new DateTime(2018, 12, 29, 21, 24, 0, 293, DateTimeKind.Local), 1, 75f },
                    { 65, new DateTime(2018, 12, 30, 21, 24, 0, 293, DateTimeKind.Local), 1, 74f },
                    { 64, new DateTime(2018, 12, 31, 21, 24, 0, 293, DateTimeKind.Local), 1, 73f },
                    { 63, new DateTime(2019, 1, 1, 21, 24, 0, 293, DateTimeKind.Local), 1, 72f },
                    { 62, new DateTime(2019, 1, 2, 21, 24, 0, 293, DateTimeKind.Local), 1, 71f },
                    { 61, new DateTime(2019, 1, 3, 21, 24, 0, 293, DateTimeKind.Local), 1, 70f },
                    { 60, new DateTime(2019, 1, 4, 21, 24, 0, 293, DateTimeKind.Local), 1, 89f },
                    { 59, new DateTime(2019, 1, 5, 21, 24, 0, 293, DateTimeKind.Local), 1, 88f },
                    { 58, new DateTime(2019, 1, 6, 21, 24, 0, 293, DateTimeKind.Local), 1, 87f },
                    { 57, new DateTime(2019, 1, 7, 21, 24, 0, 293, DateTimeKind.Local), 1, 86f },
                    { 56, new DateTime(2019, 1, 8, 21, 24, 0, 293, DateTimeKind.Local), 1, 85f },
                    { 55, new DateTime(2019, 1, 9, 21, 24, 0, 293, DateTimeKind.Local), 1, 84f },
                    { 54, new DateTime(2019, 1, 10, 21, 24, 0, 293, DateTimeKind.Local), 1, 83f },
                    { 53, new DateTime(2019, 1, 11, 21, 24, 0, 293, DateTimeKind.Local), 1, 82f },
                    { 74, new DateTime(2018, 12, 21, 21, 24, 0, 293, DateTimeKind.Local), 1, 83f },
                    { 52, new DateTime(2019, 1, 12, 21, 24, 0, 293, DateTimeKind.Local), 1, 81f },
                    { 75, new DateTime(2018, 12, 20, 21, 24, 0, 293, DateTimeKind.Local), 1, 84f },
                    { 77, new DateTime(2018, 12, 18, 21, 24, 0, 293, DateTimeKind.Local), 1, 86f },
                    { 98, new DateTime(2018, 11, 27, 21, 24, 0, 293, DateTimeKind.Local), 1, 87f },
                    { 97, new DateTime(2018, 11, 28, 21, 24, 0, 293, DateTimeKind.Local), 1, 86f },
                    { 96, new DateTime(2018, 11, 29, 21, 24, 0, 293, DateTimeKind.Local), 1, 85f },
                    { 95, new DateTime(2018, 11, 30, 21, 24, 0, 293, DateTimeKind.Local), 1, 84f },
                    { 94, new DateTime(2018, 12, 1, 21, 24, 0, 293, DateTimeKind.Local), 1, 83f },
                    { 93, new DateTime(2018, 12, 2, 21, 24, 0, 293, DateTimeKind.Local), 1, 82f },
                    { 92, new DateTime(2018, 12, 3, 21, 24, 0, 293, DateTimeKind.Local), 1, 81f },
                    { 91, new DateTime(2018, 12, 4, 21, 24, 0, 293, DateTimeKind.Local), 1, 80f },
                    { 90, new DateTime(2018, 12, 5, 21, 24, 0, 293, DateTimeKind.Local), 1, 79f },
                    { 89, new DateTime(2018, 12, 6, 21, 24, 0, 293, DateTimeKind.Local), 1, 78f },
                    { 88, new DateTime(2018, 12, 7, 21, 24, 0, 293, DateTimeKind.Local), 1, 77f },
                    { 87, new DateTime(2018, 12, 8, 21, 24, 0, 293, DateTimeKind.Local), 1, 76f },
                    { 86, new DateTime(2018, 12, 9, 21, 24, 0, 293, DateTimeKind.Local), 1, 75f },
                    { 85, new DateTime(2018, 12, 10, 21, 24, 0, 293, DateTimeKind.Local), 1, 74f },
                    { 84, new DateTime(2018, 12, 11, 21, 24, 0, 293, DateTimeKind.Local), 1, 73f },
                    { 83, new DateTime(2018, 12, 12, 21, 24, 0, 293, DateTimeKind.Local), 1, 72f },
                    { 82, new DateTime(2018, 12, 13, 21, 24, 0, 293, DateTimeKind.Local), 1, 71f },
                    { 81, new DateTime(2018, 12, 14, 21, 24, 0, 293, DateTimeKind.Local), 1, 70f },
                    { 80, new DateTime(2018, 12, 15, 21, 24, 0, 293, DateTimeKind.Local), 1, 89f },
                    { 79, new DateTime(2018, 12, 16, 21, 24, 0, 293, DateTimeKind.Local), 1, 88f },
                    { 78, new DateTime(2018, 12, 17, 21, 24, 0, 293, DateTimeKind.Local), 1, 87f },
                    { 76, new DateTime(2018, 12, 19, 21, 24, 0, 293, DateTimeKind.Local), 1, 85f },
                    { 51, new DateTime(2019, 1, 13, 21, 24, 0, 293, DateTimeKind.Local), 1, 80f },
                    { 50, new DateTime(2019, 1, 14, 21, 24, 0, 293, DateTimeKind.Local), 1, 79f },
                    { 49, new DateTime(2019, 1, 15, 21, 24, 0, 293, DateTimeKind.Local), 1, 78f },
                    { 22, new DateTime(2019, 2, 11, 21, 24, 0, 293, DateTimeKind.Local), 1, 71f },
                    { 21, new DateTime(2019, 2, 12, 21, 24, 0, 293, DateTimeKind.Local), 1, 70f },
                    { 20, new DateTime(2019, 2, 13, 21, 24, 0, 293, DateTimeKind.Local), 1, 89f },
                    { 19, new DateTime(2019, 2, 14, 21, 24, 0, 293, DateTimeKind.Local), 1, 88f },
                    { 18, new DateTime(2019, 2, 15, 21, 24, 0, 293, DateTimeKind.Local), 1, 87f },
                    { 17, new DateTime(2019, 2, 16, 21, 24, 0, 293, DateTimeKind.Local), 1, 86f },
                    { 16, new DateTime(2019, 2, 17, 21, 24, 0, 293, DateTimeKind.Local), 1, 85f },
                    { 15, new DateTime(2019, 2, 18, 21, 24, 0, 293, DateTimeKind.Local), 1, 84f },
                    { 14, new DateTime(2019, 2, 19, 21, 24, 0, 293, DateTimeKind.Local), 1, 83f },
                    { 13, new DateTime(2019, 2, 20, 21, 24, 0, 293, DateTimeKind.Local), 1, 82f },
                    { 12, new DateTime(2019, 2, 21, 21, 24, 0, 293, DateTimeKind.Local), 1, 81f },
                    { 11, new DateTime(2019, 2, 22, 21, 24, 0, 293, DateTimeKind.Local), 1, 80f },
                    { 10, new DateTime(2019, 2, 23, 21, 24, 0, 293, DateTimeKind.Local), 1, 79f },
                    { 9, new DateTime(2019, 2, 24, 21, 24, 0, 293, DateTimeKind.Local), 1, 78f },
                    { 8, new DateTime(2019, 2, 25, 21, 24, 0, 293, DateTimeKind.Local), 1, 77f },
                    { 7, new DateTime(2019, 2, 26, 21, 24, 0, 293, DateTimeKind.Local), 1, 76f },
                    { 6, new DateTime(2019, 2, 27, 21, 24, 0, 293, DateTimeKind.Local), 1, 75f },
                    { 5, new DateTime(2019, 2, 28, 21, 24, 0, 293, DateTimeKind.Local), 1, 74f },
                    { 4, new DateTime(2019, 3, 1, 21, 24, 0, 293, DateTimeKind.Local), 1, 73f },
                    { 3, new DateTime(2019, 3, 2, 21, 24, 0, 293, DateTimeKind.Local), 1, 72f },
                    { 2, new DateTime(2019, 3, 3, 21, 24, 0, 293, DateTimeKind.Local), 1, 71f },
                    { 23, new DateTime(2019, 2, 10, 21, 24, 0, 293, DateTimeKind.Local), 1, 72f },
                    { 24, new DateTime(2019, 2, 9, 21, 24, 0, 293, DateTimeKind.Local), 1, 73f },
                    { 25, new DateTime(2019, 2, 8, 21, 24, 0, 293, DateTimeKind.Local), 1, 74f },
                    { 26, new DateTime(2019, 2, 7, 21, 24, 0, 293, DateTimeKind.Local), 1, 75f },
                    { 48, new DateTime(2019, 1, 16, 21, 24, 0, 293, DateTimeKind.Local), 1, 77f },
                    { 47, new DateTime(2019, 1, 17, 21, 24, 0, 293, DateTimeKind.Local), 1, 76f },
                    { 46, new DateTime(2019, 1, 18, 21, 24, 0, 293, DateTimeKind.Local), 1, 75f },
                    { 45, new DateTime(2019, 1, 19, 21, 24, 0, 293, DateTimeKind.Local), 1, 74f },
                    { 44, new DateTime(2019, 1, 20, 21, 24, 0, 293, DateTimeKind.Local), 1, 73f },
                    { 43, new DateTime(2019, 1, 21, 21, 24, 0, 293, DateTimeKind.Local), 1, 72f },
                    { 42, new DateTime(2019, 1, 22, 21, 24, 0, 293, DateTimeKind.Local), 1, 71f },
                    { 41, new DateTime(2019, 1, 23, 21, 24, 0, 293, DateTimeKind.Local), 1, 70f },
                    { 40, new DateTime(2019, 1, 24, 21, 24, 0, 293, DateTimeKind.Local), 1, 89f },
                    { 39, new DateTime(2019, 1, 25, 21, 24, 0, 293, DateTimeKind.Local), 1, 88f },
                    { 99, new DateTime(2018, 11, 26, 21, 24, 0, 293, DateTimeKind.Local), 1, 88f },
                    { 38, new DateTime(2019, 1, 26, 21, 24, 0, 293, DateTimeKind.Local), 1, 87f },
                    { 36, new DateTime(2019, 1, 28, 21, 24, 0, 293, DateTimeKind.Local), 1, 85f },
                    { 35, new DateTime(2019, 1, 29, 21, 24, 0, 293, DateTimeKind.Local), 1, 84f },
                    { 34, new DateTime(2019, 1, 30, 21, 24, 0, 293, DateTimeKind.Local), 1, 83f },
                    { 33, new DateTime(2019, 1, 31, 21, 24, 0, 293, DateTimeKind.Local), 1, 82f },
                    { 32, new DateTime(2019, 2, 1, 21, 24, 0, 293, DateTimeKind.Local), 1, 81f },
                    { 31, new DateTime(2019, 2, 2, 21, 24, 0, 293, DateTimeKind.Local), 1, 80f },
                    { 30, new DateTime(2019, 2, 3, 21, 24, 0, 293, DateTimeKind.Local), 1, 79f },
                    { 29, new DateTime(2019, 2, 4, 21, 24, 0, 293, DateTimeKind.Local), 1, 78f },
                    { 28, new DateTime(2019, 2, 5, 21, 24, 0, 293, DateTimeKind.Local), 1, 77f },
                    { 27, new DateTime(2019, 2, 6, 21, 24, 0, 293, DateTimeKind.Local), 1, 76f },
                    { 37, new DateTime(2019, 1, 27, 21, 24, 0, 293, DateTimeKind.Local), 1, 86f },
                    { 100, new DateTime(2018, 11, 25, 21, 24, 0, 293, DateTimeKind.Local), 1, 89f }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logs_UserId",
                table: "Logs",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
