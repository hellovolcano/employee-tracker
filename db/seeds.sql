INSERT INTO department (name)
VALUES
    ('R & D'),
    ('Product Management'),
    ('Marketing Operations');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Engineer', 130000, 1 ),
    ('Product Manager', 140000, 2),
    ('Marcomm Manager', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Adam','Peterson',1,null),
    ('Daniel','Peterson',2,null),
    ('Roscoe','Peterson',3,null),
    ('Valerie','Gleason',1,null);