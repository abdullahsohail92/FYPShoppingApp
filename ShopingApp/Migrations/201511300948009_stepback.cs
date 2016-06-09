namespace ShopingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class stepback : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FeatureProducts", "Feature_Id", "dbo.Features");
            DropForeignKey("dbo.FeatureProducts", "Product_Id", "dbo.Products");
            DropIndex("dbo.FeatureProducts", new[] { "Feature_Id" });
            DropIndex("dbo.FeatureProducts", new[] { "Product_Id" });
            CreateIndex("dbo.Features", "ProductId");
            AddForeignKey("dbo.Features", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
            DropTable("dbo.FeatureProducts");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.FeatureProducts",
                c => new
                    {
                        Feature_Id = c.Int(nullable: false),
                        Product_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Feature_Id, t.Product_Id });
            
            DropForeignKey("dbo.Features", "ProductId", "dbo.Products");
            DropIndex("dbo.Features", new[] { "ProductId" });
            CreateIndex("dbo.FeatureProducts", "Product_Id");
            CreateIndex("dbo.FeatureProducts", "Feature_Id");
            AddForeignKey("dbo.FeatureProducts", "Product_Id", "dbo.Products", "Id", cascadeDelete: true);
            AddForeignKey("dbo.FeatureProducts", "Feature_Id", "dbo.Features", "Id", cascadeDelete: true);
        }
    }
}
