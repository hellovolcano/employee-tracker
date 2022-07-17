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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Ryan','Gleason',1),
    ('Justin','Gleason',2),
    ('Tyler','Gleason',2),
    ('Adam','Peterson',1),
    ('Daniel','Peterson',2),
    ('Roscoe','Peterson',3),
    ('Valerie','Gleason',1);